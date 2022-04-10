import { List, ListSubheader, Box, Menu, MenuItem, IconButton, Paper, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "../../components/mails/singleMail";
import { fetchData } from "../../features/makeAirtableRequest";
import { handleCheck, handleDelSelected } from "../../handlers";
import { selectAllMails } from "./mailsSlice";
import MailsSkeleton from "../../components/elements/mailsSkeleton";

const Mails = () => {
   const dispatch = useDispatch();
   const { status } = useSelector(state => state.mails);
   const [pending, setPending] = useState(false);
   useEffect(() => {
      if (status === "iddle") {
         dispatch(fetchData("mails")());
      }
   }, []);
   const mails = useSelector(selectAllMails);
   // console.log('mails: ', mails);
   const selectedMails = mails.filter(mail => mail.fields.selected);
   const workingMails = mails.filter(mail => mail.fields.status === "working");
   const sentMails = mails.filter(mail => mail.fields.status === "sent");
   const [openWork, setOpenWork] = useState(null);
   const [openSent, setOpenSent] = useState(null);
   const handleMenuWork = ev => {
      setOpenWork(null);
   }
   const handleMenuSent = ev => {
      setOpenSent(null);
   }
   return (
      <Box>
         <Stack direction="row" spacing={5} paddingX={5}>
            <Paper sx={{ width: "100%", maxWidth: 500 }}>
               <List>
                  <ListSubheader sx={{ display: "flex" }}>
                     <IconButton children={<MenuIcon />} onClick={ev => setOpenWork(ev.currentTarget)} />
                     <Box component="span" sx={{ flexGrow: 1 }}>Working directory</Box>
                  </ListSubheader>
                  {false ? workingMails.map(({ id, fields }) =>
                     <SingleMail key={id} {...{ ...fields }} />)
                     :
                     <MailsSkeleton />
                  }
               </List>
            </Paper>
            <Paper sx={{ width: "100%", maxWidth: 500 }}>
               <List>
                  <ListSubheader sx={{ display: "flex" }}>
                     <IconButton children={<MenuIcon />} onClick={ev => setOpenSent(ev.currentTarget)} />
                     <Box component="span" sx={{ flexGrow: 1 }}>Sent mails</Box>
                  </ListSubheader>
                  {sentMails && sentMails.map(({ id, fields }) =>
                     <SingleMail key={id} {...{ ...fields, id }} />)}
               </List>
            </Paper>
         </Stack>


         <Menu open={!!openWork} anchorEl={openWork}>
            <MenuItem key="delete working" children="Delete selected" onClick={handleMenuWork} />
         </Menu>
         <Menu open={!!openSent} anchorEl={openSent}>
            <MenuItem key="delete sent" children="Delete selected" onClick={handleMenuSent} />
         </Menu>
         {/* {mails.map(({ id, fields }, num) => <div key={id}>
            {num + 1}.
            <input type="checkbox"
               checked={!!fields.selected}
               onChange={ev => handleCheck("mails", setPending)(!fields.selected, id)}
               disabled={pending}
            />
            <SingleMail
               {...{ ...fields, id, num, pending }}
            // handleCheck={ev => handleCheck(ev, id)}
            />
         </div>
         )} */}
         <button onClick={() => handleDelSelected("mails", setPending)(selectedMails.map(mail => mail.id))}>
            Delete selected
         </button>
      </Box>
   )
}

export default Mails;
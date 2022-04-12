import { List, ListSubheader, Box, Menu, MenuItem, IconButton, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "../../components/mails/singleMail";
import { fetchData } from "../../features/makeAirtableRequest";
import { handleDelSelected } from "../../handlers";
import { selectAllMails } from "./mailsSlice";
import MailsSkeleton from "../../components/mails/elements/mailsSkeleton";
import Trash from "../../components/mails/elements/mailTrash";

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
                     <Trash />
                     <Box component="span" sx={{ flexGrow: 1 }}>Working directory</Box>
                  </ListSubheader>
                  {mails ? workingMails.map(({ id, fields }) =>
                     <SingleMail key={id} {...{ ...fields }} />)
                     :
                     <MailsSkeleton />
                  }
               </List>
            </Paper>
            <Paper sx={{ width: "100%", maxWidth: 500 }}>
               <List>
                  <ListSubheader sx={{ display: "flex" }}>
                     <Trash />
                     <Box component="span" sx={{ flexGrow: 1 }}>Sent mails</Box>
                  </ListSubheader>
                  {sentMails && sentMails.map(({ id, fields }) =>
                     <SingleMail key={id} {...{ ...fields, id }} />)}
               </List>
            </Paper>
         </Stack>

         <Menu open={!!openWork} anchorEl={openWork} onClose={() => setOpenWork(null)}>
            <MenuItem key="delete working" children="Delete selected" onClick={handleMenuWork} />
         </Menu>
         <Menu open={!!openSent} anchorEl={openSent}>
            <MenuItem key="delete sent" children="Delete selected" onClick={handleMenuSent} />
         </Menu>
         <button onClick={() => handleDelSelected("mails", setPending)(selectedMails.map(mail => mail.id))}>
            Delete selected
         </button>
      </Box>
   )
}

export default Mails;
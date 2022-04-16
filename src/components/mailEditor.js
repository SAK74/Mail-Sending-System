import { Button, IconButton, Modal, Paper, Stack, Zoom } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '../components/subscribers/addSubscriber/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { handleAdd } from '../handlers';
import { update } from "../features/makeAirtableRequest";
import { addMail, setStatusEditor, updateMail } from "../pages/mails/mailsSlice";
import { setStatusSubscr } from "../pages/subscribers/subscribersSlice";

export default function MailEditor({ subject, content, id }) {
   const dispatch = useDispatch();
   const { openModal } = useSelector(state => state.mails);
   const { control, formState: { errors }, watch } = useForm({
      defaultValues: {
         subject, content
      },
      mode: "all"
   });
   const handleClick = ({ target: { innerText } }) => {
      console.log(!Object.keys(errors).length, innerText, watch());
      const data = watch();
      console.log(Boolean(data.content.replace(/\n/g, "")));
      if (Object.keys(errors).length) return;
      // console.log("done");

      // dispatch(setStatusSubscr("pending"));
      // if (innerText === "SAVE") {
      //    !id ? handleAdd("mails")(data) : update("mails")(id, data)
      //       .then(data => dispatch(updateMail(data)));

      dispatch(setStatusSubscr("iddle"));
      dispatch(setStatusEditor(false));
   }
   return (
      <Modal open={openModal}
         hideBackdrop
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(2px)"
         }}
      >
         <Zoom in={openModal} timeout={1000}>
            <Paper sx={{
               p: 2,
               pt: 5,
               display: "flex",
               flexDirection: "column",
               width: "70%",
               maxWidth: "95%",
               position: "relative"
            }}>
               <IconButton
                  onClick={() => { dispatch(setStatusEditor(false)) }}
                  sx={{ position: "absolute", top: 0, right: 0 }}
               >
                  <CloseIcon />
               </IconButton>
               <TextField
                  name="subject"
                  control={control}
               />
               <TextField
                  name="content"
                  multiline
                  minRows={3}
                  maxRows={6}
                  required
                  control={control}
                  rules={{
                     required: "This field must be filled",
                     validate: val => Boolean(val.replace(/\n/g, "")) || "This field must be filled"
                  }}
               />
               <Stack direction={"row"} spacing={3}>
                  <Button children="save and send" />
                  <Button children="save" onClick={ev => handleClick(ev)} />
               </Stack>
            </Paper>
         </Zoom>
      </Modal>
   )
}
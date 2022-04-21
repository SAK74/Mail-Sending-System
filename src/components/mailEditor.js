import { Button, IconButton, Modal, Paper, Stack, Zoom } from "@mui/material";
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { TextField } from './subscribers/elements/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { handleAdd, handleUpdate } from '../handlers';
import { setStatusEditor } from "../pages/mails/mailsSlice";
import { useEffect } from "react";

function MailEditor({ openModal, subject, content, id, setStatusEditor }) {
   // console.log("props: ", subject, content, id);
   const { control, handleSubmit, reset } = useForm({
      defaultValues: {
         subject, content
      },
      mode: "all"
   });
   useEffect(() => reset({ subject, content }), [openModal]);

   const onSubmit = async (data, { target: { innerText } }) => {
      console.log(data, innerText);
      if (innerText === "SAVE") {
         !id ? await handleAdd("mails")({ ...data, status: "toSend" }) :
            await handleUpdate("mails")(id, { ...data, status: "toSend" })
      } else {
         console.log("do send");
         // sendMail
      }
      console.log("done");
      setStatusEditor(false);
   }

   return (
      <Modal open={!!openModal}
         hideBackdrop
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(2px)"
         }}
      >
         <Zoom in={!!openModal} timeout={800}>
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
                  onClick={() => setStatusEditor(false)}
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
                  <Button children="send & save" onClick={handleSubmit(onSubmit)} />
                  <Button children="save" onClick={handleSubmit(onSubmit)} />
               </Stack>
            </Paper>
         </Zoom>
      </Modal>
   )
}

const mapStateToProps = state => {
   const { openModal } = state.mails;
   const { subject, content } = openModal;
   return ({
      subject: openModal ? subject : "",
      content: openModal ? content : "",
      id: openModal?.id,
      openModal: Boolean(openModal)
   });
}
export default connect(mapStateToProps, { setStatusEditor })(MailEditor);
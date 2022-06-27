import { Button, IconButton, Modal, Paper, Stack, Typography, Zoom } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { connect, ConnectedProps } from 'react-redux';
import { TextField } from './subscribers/elements';
import CloseIcon from '@mui/icons-material/Close';
import { handleAdd, handleSend, handleUpdate } from '../handlers';
import { setStatusEditor } from "../pages/mails/mailsSlice";
import { useEffect } from "react";
import { ReduxState } from '../store';

type PropsFromRedux = ConnectedProps<typeof connector>;
export type MailFormValues = Pick<PropsFromRedux, "subject" | "content">;

function MailEditor({ openModal, subject, content, id, changeStatus }: PropsFromRedux) {

   const { control, handleSubmit, reset } = useForm({
      defaultValues: {
         subject, content
      },
      mode: "all"
   });
   useEffect(() => reset({ subject, content }), [openModal]);

   const onValid: SubmitHandler<MailFormValues> = async (data, ev) => {
      const innerText = ev?.target as string;
      id ? await handleUpdate("mails")(id, { ...data, status: "toSend" }) :
         await handleAdd("mails")({ ...data, status: "toSend" })
            .then(respID => id = respID);
      if (innerText !== "SAVE") {
         handleSend({ id, fields: { ...data, status: "toSend" } });
      }
      changeStatus(false);
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
                  onClick={() => changeStatus(false)}
                  sx={{ position: "absolute", top: 0, right: 0 }}
               >
                  <CloseIcon />
               </IconButton>
               <Typography sx={{ mb: 2, color: 'darkblue' }}>
                  Use <b>{"<name>"}</b> to select name of subscriber
                  (e.t. <i>Hello {"<name>"}! =&gt; Hello Lila</i>)
               </Typography>
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
                  <Button children="save & send" onClick={handleSubmit(onValid)} />
                  <Button children="save" onClick={handleSubmit(onValid)} />
               </Stack>
            </Paper>
         </Zoom>
      </Modal>
   )
}

const mapStateToProps = (state: ReduxState) => {
   const { openModal } = state.mails;
   if (typeof openModal === "boolean") {
      return {
         openModal,
         subject: "",
         content: "",
         id: ""
      }
   }
   const { id, fields: { subject, content } } = openModal;
   return { subject: subject ? subject : "", content, id, openModal: true };
}

const connector = connect(mapStateToProps, { changeStatus: setStatusEditor });
export default connector(MailEditor);
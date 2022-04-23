import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { setStatusEditor } from '../../pages/mails/mailsSlice';

function MailToSend({ subject, content, id }) {
   console.log("props: ", subject, content);
   const dispatch = useDispatch();
   return (
      <Card sx={{
         p: 2,
         alignSelf: "start"
      }}>
         <CardHeader
            title="Mail to send"
            titleTypographyProps={{
               variant: "body1"
            }}
            subheader={subject ? subject : "..."}
            subheaderTypographyProps={{}}
         />
         <CardContent>
            {content ? content : "..."}
         </CardContent>
         <CardActions>
            <Button
               size="small"
               children="preview/edit"
               onClick={() => dispatch(setStatusEditor(!id ? true : { subject, content, id }))}
            />
         </CardActions>
      </Card>
   )
}

export default memo(MailToSend);
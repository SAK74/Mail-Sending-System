import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";

function MailToSend({ subject, content, id }) {
   // console.log("props: ", subject, content);
   return (
      <Card raised>
         <CardHeader subheader={subject} />
         <CardContent>
            {content}
         </CardContent>
         <CardActions>
            <Button size="small" children="preview/edit" />
         </CardActions>
      </Card>
   )
}

export default MailToSend;
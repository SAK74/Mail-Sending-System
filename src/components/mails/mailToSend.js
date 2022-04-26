import { Edit } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { setStatusEditor } from '../../pages/mails/mailsSlice';

function MailToSend({ subject, content, id }) {
   const dispatch = useDispatch();
   return (
      <Card sx={{
         p: 2,
         alignSelf: "start",
         width: 200,
         // textOverflow: "ellipsis"

      }}>
         <CardHeader
            title="Mail to send"
            titleTypographyProps={{
               variant: "body1"
            }}
            subheader={subject ? subject : "..."}
            subheaderTypographyProps={{}}
         />
         <CardContent sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
         }}>
            {content ? content : "..."}
         </CardContent>
         <CardActions>
            <Tooltip
               title="edit"
               children={<span>
                  <IconButton
                     children={<Edit color={id ? "primary" : "default"} />}
                     disabled={!id}
                     onClick={() => dispatch(setStatusEditor({ subject, content, id }))}
                  />
               </span>}
            />
            <Button
               size="small"
               children="new mail"
               onClick={() => dispatch(setStatusEditor(true))}
            />
         </CardActions>
      </Card>
   )
}

export default memo(MailToSend);
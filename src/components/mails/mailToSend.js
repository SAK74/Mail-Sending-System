import { Edit, AddCircleOutline } from "@mui/icons-material";
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
               title="Show / edit"
               children={<span>
                  <IconButton
                     children={<Edit color={id ? "primary" : "default"} />}
                     disabled={!id}
                     onClick={() => dispatch(setStatusEditor({ subject, content, id }))}
                  />
               </span>}
            />
            <Tooltip
               title="Create new"
               children={<span>
                  <IconButton
                     children={<AddCircleOutline color="primary" />}
                     onClick={() => dispatch(setStatusEditor(true))}
                  />
               </span>}
            />
         </CardActions>
      </Card>
   )
}

export default memo(MailToSend);
import { Edit, AddCircleOutline } from "@mui/icons-material";
import {
   Card, CardActions, CardContent, CardHeader,
   IconButton, Tooltip, Typography, cardHeaderClasses
} from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { setStatusEditor } from '../../pages/mails/mailsSlice';

function MailToSend({ subject, content, id }) {
   const dispatch = useDispatch();
   return (
      <Card sx={{
         p: 2,
         alignSelf: "start",
         width: 200
      }}>
         <CardHeader
            sx={{
               [`& .${cardHeaderClasses.content}`]: { overflow: "hidden" }
            }}
            title="Mail to send:"
            titleTypographyProps={{
               variant: "body2"
            }}
            subheader={subject ? subject : "..."}
            subheaderTypographyProps={{
               noWrap: true,
               variant: "body1"
            }}
         />
         <CardContent >
            <Typography
               noWrap
               children={content ? content : "..."}
            />
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
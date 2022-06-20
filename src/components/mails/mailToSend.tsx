import { Edit, AddCircleOutline } from "@mui/icons-material";
import {
   Card, CardActions, CardContent, CardHeader,
   IconButton, Tooltip, Typography, cardHeaderClasses
} from "@mui/material";
import { memo } from "react";
import { setStatusEditor } from '../../pages/mails/mailsSlice';
import { useReduxDispatch } from "../../store";
import { Mail } from '../../types';

function MailToSend({ fields, id }: Partial<Mail>) {

   const { subject, content } = fields ? fields : { subject: "...", content: "..." };

   const dispatch = useReduxDispatch();
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
            subheader={subject}
            subheaderTypographyProps={{
               noWrap: true,
               variant: "body1"
            }}
         />
         <CardContent >
            <Typography
               noWrap
               children={content}
            />
         </CardContent>
         <CardActions>
            <Tooltip
               title="Show / edit"
               children={<span>
                  <IconButton
                     children={<Edit color={id ? "primary" : "disabled"} />}
                     disabled={!id}
                     onClick={id ?
                        () => dispatch(setStatusEditor({ fields: { subject, content, status: "work" }, id }))
                        : undefined}
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
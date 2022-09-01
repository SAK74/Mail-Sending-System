import { ForwardToInboxOutlined, Edit } from "@mui/icons-material";
import { Box, Checkbox, IconButton, ListItem, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import { FC, memo } from 'react';
import { handleUpdate, handleSend } from '../../handlers';
import { setStatusEditor } from "../../pages/mails/mailsSlice";
import { useNavigate } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "../../store";
import { Mail } from "../../types";

const SingleMail: FC<Omit<Mail, "createdTime">> = (mail) => {
   const { id, fields: { subject, content, status: mailStatus, selected } } = mail;
   const { status } = useReduxSelector(state => state.mails);
   const dispatch = useReduxDispatch();
   const navigate = useNavigate();
   const handleClickSend = () => {
      handleSend(mail);
      navigate("/subscribers", { replace: true });
   }
   return <>
      <ListItem
         disableGutters
         secondaryAction={<Box>
            {(mailStatus !== "sent") && <Tooltip
               title="Edit mail"
               children={<IconButton
                  children={<Edit />}
                  onClick={() => dispatch(setStatusEditor(mail))}
               />}
            />}
            <Tooltip
               title="Send to selected subscribers"
               children={<IconButton
                  children={<ForwardToInboxOutlined />}
                  onClick={handleClickSend}
               />}
            />
         </Box>}
      >
         <ListItemButton onClick={() => handleUpdate("mails")(id, { selected: !selected })}>
            <Checkbox
               checked={!!selected}
               disabled={status === "pending"}
               onClick={() => handleUpdate("mails")(id, { selected: !selected })}
            />
            <ListItemText
               primary={subject}
               secondary={content}
               secondaryTypographyProps={{
                  noWrap: true
               }}
            />
         </ListItemButton>
      </ListItem>
   </>
}

export default memo(SingleMail);
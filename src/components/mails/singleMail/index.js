import { ForwardToInboxOutlined, Edit } from "@mui/icons-material";
import { Box, Checkbox, IconButton, ListItem, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import { memo } from 'react';
import { handleUpdate, handleSend } from '../../../handlers';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusEditor } from "../../../pages/mails/mailsSlice";
import { useNavigate } from "react-router-dom";

const SingleMail = ({ subject, content, selected, id, status: mailStatus }) => {
   const { status } = useSelector(state => state.mails);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleClickSend = () => {
      handleSend({ id, fields: { subject, content } });
      navigate("/subscribers", { replace: true });
   }
   return <>
      <ListItem
         secondaryAction={<Box>
            {(mailStatus !== "sent") && <Tooltip
               title="Edit mail"
               children={<IconButton
                  children={<Edit />}
                  onClick={() => dispatch(setStatusEditor({ subject, content, id }))}
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
            <ListItemText primary={subject} secondary={content} />
         </ListItemButton>
      </ListItem>
   </>
}

export default memo(SingleMail);
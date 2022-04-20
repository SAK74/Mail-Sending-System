import { ForwardToInboxOutlined, Edit } from "@mui/icons-material";
import { Box, Checkbox, IconButton, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { memo } from 'react';
import { handleUpdate } from '../../../handlers';
import { useSelector } from 'react-redux';

const SingleMail = ({ subject, content, selected, id, status: mailStatus }) => {
   const { status } = useSelector(state => state.mails);
   return <>
      <ListItem
         secondaryAction={<Box>
            <IconButton children={<ForwardToInboxOutlined />} />
            {(mailStatus === "work") && <IconButton children={<Edit />} />}
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
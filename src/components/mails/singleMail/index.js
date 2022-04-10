import { ForwardToInboxOutlined, Edit } from "@mui/icons-material";
import { Box, Checkbox, IconButton, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { memo } from 'react';


const SingleMail = ({ subject, content, selected, id, status: mailStatus }) => {
   return <>
      <ListItem
         secondaryAction={<Box>
            <IconButton children={<ForwardToInboxOutlined />} />
            {(mailStatus === "working") && <IconButton children={<Edit />} />}
         </Box>}
      >
         <ListItemButton>
            <Checkbox checked={!!selected} />
            <ListItemText primary={subject} secondary={content} />
         </ListItemButton>
      </ListItem>
   </>
}

export default memo(SingleMail);
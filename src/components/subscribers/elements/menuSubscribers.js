import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { handleDelSelected, handleSend } from '../../../handlers';
export default function MenuSubscribers({ selSubscr }) {
   const [open, setOpen] = useState(null);
   const handleMenu = ({ currentTarget }) => setOpen(currentTarget);
   const handleDelete = () => {
      setOpen(null);
      handleDelSelected("subscribers")(selSubscr.map(subscr => subscr.id));
   }
   const _handleSend = () => {
      setOpen(null);
      handleSend(null, selSubscr);
   }
   return <>
      <Tooltip title="Menu">
         <IconButton onClick={handleMenu}>
            <MenuIcon fontSize='large' />
         </IconButton>
      </Tooltip>
      <Menu open={!!open} anchorEl={open} onClose={() => setOpen(null)}>
         <MenuItem dense key="delete" children="Delete selected" onClick={handleDelete} />
         <MenuItem dense key="send mail" children="Send mail to selected" onClick={_handleSend} />
      </Menu>

   </>
}

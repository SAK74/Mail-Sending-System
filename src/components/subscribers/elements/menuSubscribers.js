import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { handleDelSelected, handleSend } from '../../../handlers';

export default function MenuSubscribers({ selSubscr }) {
   const [open, setOpen] = useState(null);
   const handleMenu = ev => setOpen(ev.currentTarget);
   const handleDelete = () => {
      setOpen(null);
      handleDelSelected("subscribers")(selSubscr.map(subscr => subscr.id));
   }
   const _handleSend = () => {
      setOpen(null);
      handleSend();
   }
   return <>
      <IconButton onClick={handleMenu}>
         <MenuIcon fontSize='large' />
      </IconButton>
      <Menu open={!!open} anchorEl={open} onClose={() => setOpen(null)}>
         <MenuItem key="delete" children="Delete selected" onClick={handleDelete} />
         <MenuItem key="send mail" children="Send Mail to selected" onClick={_handleSend} />
      </Menu>
   </>
}


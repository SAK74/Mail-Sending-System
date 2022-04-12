import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function MenuSubscribers() {
   const [open, setOpen] = useState(null);
   const handleMenu = ev => setOpen(ev.currentTarget);
   const handleDelete = () => {
      setOpen(null);
   }
   const handleSend = () => {
      setOpen(null);
   }
   return <>
      <IconButton onClick={handleMenu}>
         <MenuIcon fontSize='large' />
      </IconButton>
      <Menu open={!!open} anchorEl={open} onClose={() => setOpen(null)}>
         <MenuItem key="delete" children="Delete selected" onClick={handleDelete} />
         <MenuItem key="send mail" children="Send Mail to selected" onClick={handleSend} />
      </Menu>
   </>
}


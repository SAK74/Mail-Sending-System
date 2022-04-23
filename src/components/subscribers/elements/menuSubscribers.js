import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { handleDelSelected, handleSend } from '../../../handlers';
import { useSelector } from 'react-redux';
import { selectAllMails } from '../../../pages/mails/mailsSlice';

export default function MenuSubscribers({ selSubscr }) {
   const [open, setOpen] = useState(null);
   const mailToSend = useSelector(selectAllMails).find(mail => mail.fields.status === "toSend");
   const handleMenu = ({ currentTarget }) => setOpen(currentTarget);
   const handleDelete = () => {
      setOpen(null);
      handleDelSelected("subscribers")(selSubscr.map(subscr => subscr.id));
   }
   const _handleSend = () => {
      setOpen(null);
      if (!mailToSend) {
         alert("Neither mail is't selected");
      }
      handleSend(selSubscr, mailToSend);
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


import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { handleDelSelected } from "../../handlers";
import { Mail } from "../../types";

export function Trash({ mails }: { mails: Mail[] }) {
   const selectedMails = mails.filter(mail => mail.fields.selected);
   return (
      <Tooltip title="Delete selected">
         <IconButton onClick={() => handleDelSelected("mails")(selectedMails.map(mail => mail.id))}>
            <DeleteIcon />
         </IconButton>
      </Tooltip>
   )
}
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Trash() {
   return (
      <Tooltip title="Delete selected">
         <IconButton onClick={() => { }}>
            <DeleteIcon />
         </IconButton>
      </Tooltip>
   )
}
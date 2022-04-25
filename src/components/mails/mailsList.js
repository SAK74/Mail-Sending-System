import { Paper, List, ListSubheader, Box } from '@mui/material';
import Trash from './elements/mailTrash';
import SingleMail from './singleMail';
import MailsSkeleton from './elements/mailsSkeleton';
import { useSelector } from 'react-redux';
import CheckAll from './elements/checkAll';

const MailsList = ({ title, mails }) => {
   const { status } = useSelector(state => state.mails);
   return (
      <Paper sx={{ width: "100%", maxWidth: 500 }}>
         <List dense>
            <ListSubheader sx={{ display: "flex" }}>
               <CheckAll name="mails" ids={mails.map(mail => mail.id)} />
               <Trash mails={mails} />
               <Box component="span" sx={{ flexGrow: 1 }}>
                  {title}
               </Box>
            </ListSubheader>
            {(!mails.length && status === "pending") ? <MailsSkeleton /> :
               mails.map(({ id, fields }) =>
                  <SingleMail key={id} {...{ ...fields, id }} />)
            }
         </List>
      </Paper>
   )
}

export default MailsList;
import { Paper, List, ListSubheader, Box } from '@mui/material';
import { Trash, MailsSkeleton, CheckAll } from './elements';
import SingleMail from './singleMail';
import { useReduxSelector } from '../../store';
import { Mail } from '../../types';
import { FC } from 'react';

interface MailsLIstProps {
   title: string;
   mails: Mail[];
}

const MailsList: FC<MailsLIstProps> = ({ title, mails }) => {
   const { status } = useReduxSelector(state => state.mails);
   return (
      <Paper sx={{ width: 9 / 10, maxWidth: 400 }}>
         <List dense>
            <ListSubheader sx={{ display: "flex" }}>
               <CheckAll name="mails" ids={mails.map(mail => mail.id)} />
               <Trash mails={mails} />
               <Box component="span" sx={{ flexGrow: 1 }}>
                  {title}
               </Box>
            </ListSubheader>
            {(!mails.length && status === "pending") ? <MailsSkeleton /> :
               mails.map((mail) =>
                  <SingleMail key={mail.id} {...{ ...mail }} />)
            }
         </List>
      </Paper>
   )
}

export default MailsList;
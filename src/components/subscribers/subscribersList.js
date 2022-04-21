import { Paper, List, ListSubheader, Box } from '@mui/material';
import MenuSubscribers from '../subscribers/elements/menuSubscribers';
import Subscriber from './singleSubscriber';
import SubscribersSkeleton from './elements/subscribersSkeleton';


const SubscribersList = ({ subscribers }) => {
   return (
      <Paper sx={{ maxWidth: 500, width: "100%" }}>
         <List dense>
            <ListSubheader sx={{ display: "flex" }}>
               <Box children="Subscribers" component="span" sx={{ flexGrow: 1 }} />
               <MenuSubscribers selSubscr={subscribers.filter(subscr => subscr.fields.selected)} />
            </ListSubheader>
            {subscribers.length ? subscribers.map(({ id, fields }, num, arr) =>
               <Subscriber key={id} {...{ ...fields, num, arr, id }} />)
               :
               <SubscribersSkeleton />
            }
         </List>
      </Paper>
   )
}

export default SubscribersList;
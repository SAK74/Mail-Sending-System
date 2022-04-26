import { Paper, List, ListSubheader, Box } from '@mui/material';
import { MenuSubscribers, SubscribersSkeleton } from './elements';
import { CheckAll } from '../mails/elements';
import Subscriber from './singleSubscriber';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../features/makeAirtableRequest';
import { selectAll } from "../../pages/subscribers/subscribersSlice";

const SubscribersList = () => {
   const { status } = useSelector(state => state.subscribers);
   const dispatch = useDispatch();
   useEffect(() => {
      if (status === "iddle") {
         dispatch(fetchData("subscribers")());
      }
   }, []); //eslint-disable-line
   const subscribers = useSelector(selectAll);
   return (
      <Paper sx={{ maxWidth: 500, width: "100%" }}>
         <List dense>
            <ListSubheader sx={{ display: "flex" }}>
               <MenuSubscribers selSubscr={subscribers.filter(subscr => subscr.fields.selected)} />
               <Box children="Subscribers" component="span" sx={{ flexGrow: 1 }} />
               <CheckAll name="subscribers" ids={subscribers.map(subscr => subscr.id)} />
            </ListSubheader>
            {!subscribers.length && status === "pending" ? <SubscribersSkeleton /> :
               subscribers.map(({ id, fields }, num, arr) =>
                  <Subscriber key={id} {...{ ...fields, num, arr, id }} />)
            }
         </List>
      </Paper>
   )
}

export default SubscribersList;
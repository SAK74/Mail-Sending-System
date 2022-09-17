import { Paper, List, ListSubheader, Box } from '@mui/material';
import { CheckAll } from '../CheckAll';
import { Subscriber, MenuSubscribers, SubscribersSkeleton } from './';
import { useEffect } from 'react';
import { fetchData } from '../../services/makeAirtableRequest';
import { selectAll } from "../../pages/subscribers/subscribersSlice";
import { useReduxDispatch, useReduxSelector } from '../../store';

export const SubscribersList = () => {
   const { status } = useReduxSelector(state => state.subscribers);
   const dispatch = useReduxDispatch();
   useEffect(() => {
      if (status === "iddle") {
         dispatch(fetchData("subscribers")());
      }
   }, []); //eslint-disable-line
   const subscribers = useReduxSelector(selectAll);
   return (
      <Paper sx={{
         width: { md: 400, xs: 1 / 1, sm: 8 / 10 }
      }}>
         <List dense>
            <ListSubheader sx={{ display: "flex" }}>
               <MenuSubscribers selSubscr={subscribers.filter(subscr => subscr.fields?.selected)} />
               <Box children="Subscribers" component="span" sx={{ flexGrow: 1 }} />
               <CheckAll name="subscribers" ids={subscribers.map(subscr => subscr.id)} />
            </ListSubheader>
            {!subscribers.length && status === "pending" ? <SubscribersSkeleton /> :
               subscribers.map((subscriber, num, arr) =>
                  <Subscriber key={subscriber.id} {...{ subscriber, num, arr }} />)
            }
         </List>
      </Paper>
   )
}
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchData, update } from "../../features/makeAirtableRequest";
import { sendMail } from "../../features/makeMailgunRequest";
import AddSubscriber from "../../components/subscribers/addSubscriber";
import Subscriber from "../../components/subscribers/singleSubscriber";
import { selectAll } from "./subscribersSlice";
import SingleMail from "../../components/mails/singleMail";
import { selectAllMails, updateMail } from "../mails/mailsSlice";
import { List, ListSubheader, Box, IconButton, Collapse } from "@mui/material";
import { Paper, Button } from "@mui/material";
import SubscribersSkeleton from "../../components/subscribers/elements/subscribersSkeleton";
import MenuSubscribers from '../../components/subscribers/elements/menuSubscribers';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

function Subscribers() {
  const [sent, setSent] = useState(false);
  const { status } = useSelector((state) => state.subscribers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "iddle") {
      dispatch(fetchData("subscribers")());
    }
  }, []); //eslint-disable-line

  const subscribers = useSelector(selectAll);
  // console.log(subscribers);
  const selectedSubscr = subscribers.filter((subsc) => subsc.fields.selected);
  const selectedMail = useSelector(selectAllMails).find(mail => mail.fields.selected);
  // console.log("selectedMail: ", selectedMail);

  const handleSend = () => {
    setPending(true);
    sendMail(selectedSubscr.map(subscr => subscr.fields), selectedMail.fields)
      .then(resSent => {
        setSent(selectedSubscr.filter((_, id) => resSent[id].status === 'fulfilled')
          .map(subs => subs.fields.name).join(", "));
        setTimeout(() => setSent(false), 5000);
        update("mails")(selectedMail.id, { status: "sent" })
          .then(data => dispatch(updateMail(data)));
      })
      .finally(() => setPending(false));
  }
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ width: "70%", my: 2 }}>
        <span>Enter a new subscriber</span>
        <IconButton onClick={() => setOpen(!open)}>
          {!open ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
        <Collapse in={open}>
          <AddSubscriber />
        </Collapse>
      </Box>
      <Paper sx={{ maxWidth: 500, width: "100%" }}>
        <List dense>
          <ListSubheader sx={{ display: "flex" }}>
            <Box children="Subscribers" component="span" sx={{ flexGrow: 1 }} />
            <MenuSubscribers selSubscr={selectedSubscr} />
          </ListSubheader>
          {subscribers ? subscribers.map(({ id, fields }, num, arr) =>
            <Subscriber key={id} {...{ ...fields, num, arr, id }} />)
            :
            <SubscribersSkeleton />
          }
        </List>
      </Paper>

      <Button
        variant="outlined"
        children="Edit / create mail"
        size="small"
        component={Link}
        to="/mailedit"
      />

      <button className="left" onClick={handleSend}>Send mail to selected</button>

      {sent && <span>E-mail was sent to: {sent}</span>}

      {(status === "pending") && <div>Pending</div>}

      <h3>Selected mail:</h3>
      {selectedMail ? <SingleMail {...selectedMail.fields} /> : "Pending"}
    </Box>
  );
}

export default Subscribers;

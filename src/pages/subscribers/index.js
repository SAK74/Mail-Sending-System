import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchData, update } from "../../features/makeAirtableRequest";
import { sendMail } from "../../features/makeMailgunRequest";
import AddSubscriber from "../../components/subscribers/addSubscriber";
import { selectAll } from "./subscribersSlice";
import { selectAllMails, setStatusEditor, updateMail } from "../mails/mailsSlice";
import { Box, IconButton, Collapse } from "@mui/material";
import { Button } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import MailToSend from '../../components/mails/mailToSend';
import SubscribersList from '../../components/subscribers/subscribersList';

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
  const mailToSend = useSelector(selectAllMails).find(mail => mail.fields.status === "toSend");

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
      <SubscribersList subscribers={subscribers} />
      {mailToSend && <MailToSend {...{ ...mailToSend.fields, id: mailToSend.id }} />}

      <Button
        variant="outlined"
        children="Edit / create mail"
        size="small"
        onClick={() => dispatch(setStatusEditor({ ...mailToSend.fields, id: mailToSend.id }))}
      />

      <button className="left" onClick={handleSend}>Send mail to selected</button>

      {sent && <span>E-mail was sent to: {sent}</span>}

    </Box>
  );
}

export default Subscribers;

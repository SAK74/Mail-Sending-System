import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchData, update } from "../../features/makeAirtableRequest";
import { sendMail } from "../../features/makeMailgunRequest";
import AddSubscriber from "../../components/subscribers/addSubscriber";
import Subscriber from "../../components/subscribers/singleSubscriber";
import { selectAll, _deleteSubscribers } from "./subscribersSlice";
import { Container } from "./container";
import SingleMail from "../../components/mails/singleMail";
import { selectAllMails, updateMail } from "../mails/mailsSlice";
import { handleCheck, handleDelSelected } from "../../handlers";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemButton } from "@mui/material";
import { Checkbox, Paper, Stack, Button } from "@mui/material";

function Subscribers() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const { status } = useSelector((state) => state.subscribers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "iddle") {
      dispatch(fetchData("subscribers")());
    }
  }, []); //eslint-disable-line

  const subscribers = useSelector(selectAll);
  console.log(subscribers);
  const selectedSubscr = subscribers.filter((subsc) => subsc.fields.selected);
  const selectedMail = useSelector(selectAllMails).find(mail => mail.fields.selected);
  console.log("selectedMail: ", selectedMail);

  const handleSend = () => {
    setPending(true);
    sendMail(selectedSubscr.map(subscr => subscr.fields), selectedMail.fields)
      .then(resSent => {
        setSent(selectedSubscr.filter((subs, id) => resSent[id].status === 'fulfilled')
          .map(subs => subs.fields.name).join(", "));
        setTimeout(() => setSent(false), 5000);
        update("mails")(selectedMail.id, { status: "sent" })
          .then(data => dispatch(updateMail(data)));
      })
      .finally(() => setPending(false));
  }

  return (
    <Container pending={pending || status === "loading"}>
      <List subheader={<h2>Subscribers:</h2>} component={Paper}
        sx={{ width: 500 }}
      >
        {/* <ListSubheader component="h2">Subscribers</ListSubheader> */}
        {subscribers && subscribers.map(({ id, fields: { name, email, selected } }, num, arr) => <ListItem
          key={id}
          alignItems='flex-start'
          divider={num !== arr.length - 1}
          secondaryAction={<Checkbox edge="end" checked={!!selected} />}
          dense
          disablePadding
        >
          <ListItemButton>
            <ListItemText sx={{ maxWidth: 40 }} children={<h3>{num + 1}. </h3>} />
            <ListItemAvatar children={<Avatar>{name.at(0).toUpperCase()}</Avatar>} />
            <ListItemText primary={name} secondary={email} />
          </ListItemButton>
        </ListItem>)}
      </List>
      <Stack direction="row" spacing={4}>
        <Button variant="outlined" children="Send Mail to selected" size="small" />
        <Button variant="outlined" children="Edit / create mail" size="small" />
        <Button variant="outlined" children="Deleted selected" size="small" />
      </Stack>
      <h2>Subscribers:</h2>
      {subscribers &&
        subscribers.map(({ id, fields }, num) => (
          <div className="subscriber" key={id}>
            {num + 1}.&nbsp;
            <Subscriber
              // handleCheck={(ev) => handleCheck("subscribers", setPending)(ev, id)}
              {...{ ...fields, id, num, pending }}
            />
            <input
              type="checkbox"
              checked={!!fields.selected}
              onChange={ev => handleCheck("subscribers", setPending)(ev, id)}
              disabled={pending}
            />
          </div>
        ))}
      <button className="left" onClick={handleSend}>Send mail to selected</button>
      <button className="left">
        <Link to="/mailedit">Create/edit mail content</Link>
      </button>
      {sent && <span>E-mail was sent to: {sent}</span>}
      <button onClick={() => handleDelSelected("subscribers", setPending)(selectedSubscr.map(subscr => subscr.id))}>
        Delete selected
      </button>
      {(pending || status === "loading") && <div>Pending</div>}
      <h3>Selected mail:</h3>
      {selectedMail ? <SingleMail {...selectedMail.fields} /> : "Pending"}
      <AddSubscriber />
    </Container>
  );
}

export default Subscribers;

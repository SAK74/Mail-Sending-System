import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchData, update } from "../../features/makeAirtableRequest";
import { sendMail } from "../../features/makeMailgunRequest";
import AddSubscriber from "../../components/subscribers/addSubscriber";
import Subscriber from "../../components/subscribers/singleSubscriber";
import { selectAll } from "./subscribersSlice";
import { Container } from "./container";
import SingleMail from "../../components/mails/singleMail";
import { selectAllMails, updateMail } from "../mails/mailsSlice";
import { handleDelSelected } from "../../handlers";
import { List, ListSubheader, Box } from "@mui/material";
import { Paper, Stack, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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
        setSent(selectedSubscr.filter((subs, id) => resSent[id].status === 'fulfilled')
          .map(subs => subs.fields.name).join(", "));
        setTimeout(() => setSent(false), 5000);
        update("mails")(selectedMail.id, { status: "sent" })
          .then(data => dispatch(updateMail(data)));
      })
      .finally(() => setPending(false));
  }
  const [open, setOpen] = useState(null);
  const handleMenu = ({ currentTarget }) => {
    setOpen(currentTarget);
  }

  return (
    <Container pending={status === "loading"}>
      <Paper>
        <List
          sx={{ maxWidth: 500, width: "100%" }}
        >
          <ListSubheader sx={{ display: "flex" }}>
            <Box children="Subscribers" component="span" sx={{ flexGrow: 1 }} />
            <IconButton children={<MenuIcon fontSize="large" />} onClick={handleMenu} />
          </ListSubheader>
          {subscribers && subscribers.map(({ id, fields }, num, arr) =>
            <Subscriber key={id} {...{ ...fields, num, arr, id }} />)}
        </List>
      </Paper>
      <Menu
        open={!!open}
        anchorEl={open}
      >
        <MenuItem key="delete" children="Delete selected" onClick={() => setOpen(null)} />
        <MenuItem key="send mail" children="Send Mail to selected" onClick={() => setOpen(null)} />
      </Menu>
      {/* <Stack direction="row" spacing={4}> */}
      {/* <Button variant="outlined" children="Send Mail to selected" size="small" /> */}
      <Button variant="outlined" children="Edit / create mail" size="small" />
      {/* <Button variant="outlined" children="Deleted selected" size="small" /> */}
      {/* </Stack> */}

      <button className="left" onClick={handleSend}>Send mail to selected</button>
      <button className="left">
        <Link to="/mailedit">Create/edit mail content</Link>
      </button>
      {sent && <span>E-mail was sent to: {sent}</span>}
      <button onClick={() => handleDelSelected("subscribers", setPending)(selectedSubscr.map(subscr => subscr.id))}>
        Delete selected
      </button>
      {(status === "pending") && <div>Pending</div>}
      <h3>Selected mail:</h3>
      {selectedMail ? <SingleMail {...selectedMail.fields} /> : "Pending"}
      <AddSubscriber />
    </Container>
  );
}

export default Subscribers;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../features/makeAirtableRequest";
import AddSubscriber from "../../components/subscribers/addSubscriber";
import { selectAll } from "./subscribersSlice";
import { selectAllMails, setStatusEditor } from "../mails/mailsSlice";
import { Box, IconButton, Collapse, Button } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import MailToSend from '../../components/mails/mailToSend';
import SubscribersList from '../../components/subscribers/subscribersList';
import { handleSend } from '../../handlers';

function Subscribers() {
  const { status } = useSelector((state) => state.subscribers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "iddle") {
      dispatch(fetchData("subscribers")());
    }
  }, []); //eslint-disable-line

  const subscribers = useSelector(selectAll);
  // console.log(subscribers);
  const mailToSend = useSelector(selectAllMails).find(mail => mail.fields.status === "toSend");
  const [openCollapse, setOpenCollapse] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ width: "70%", my: 2 }}>
        <span>Enter a new subscriber</span>
        <IconButton onClick={() => setOpenCollapse(!openCollapse)}>
          {!openCollapse ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
        <Collapse in={openCollapse}>
          <AddSubscriber />
        </Collapse>
      </Box>
      <SubscribersList subscribers={subscribers} />
      {mailToSend && <MailToSend {...{ ...mailToSend.fields, id: mailToSend.id }} />}

      <Button
        variant="outlined"
        children="Edit / create mail"
        size="small"
        onClick={() => dispatch(setStatusEditor(!mailToSend ? true :
          { ...mailToSend.fields, id: mailToSend.id }))}
      />

      <button className="left" onClick={handleSend}>Send mail to selected</button>

    </Box>
  );
}

export default Subscribers;

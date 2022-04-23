import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AddSubscriber from "../../components/subscribers/addSubscriber";
import { selectAllMails, setStatusEditor } from "../mails/mailsSlice";
import { Box, IconButton, Collapse, Button, Stack } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import MailToSend from '../../components/mails/mailToSend';
import SubscribersList from '../../components/subscribers/subscribersList';

function Subscribers() {
  const dispatch = useDispatch();
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
      <Stack direction="row" spacing={5}>
        <SubscribersList />
        {mailToSend && <MailToSend {...{ ...mailToSend.fields, id: mailToSend.id }} />}
      </Stack>

      <Button
        variant="outlined"
        children="Edit / create mail"
        size="small"
        onClick={() => dispatch(setStatusEditor(!mailToSend ? true :
          { ...mailToSend.fields, id: mailToSend.id }))}
      />
    </Box>
  );
}

export default Subscribers;

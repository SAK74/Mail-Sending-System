import { useState } from 'react';
import { useSelector } from "react-redux";
import { AddSubscriber, SubscribersList } from "../../components/subscribers";
import { selectAllMails } from "../mails/mailsSlice";
import { Box, IconButton, Collapse, Stack } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import MailToSend from '../../components/mails/mailToSend';

function Subscribers() {
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
        {mailToSend ? <MailToSend {...{ ...mailToSend.fields, id: mailToSend.id }} /> :
          <MailToSend />
        }
      </Stack>
    </Box>
  );
}

export default Subscribers;

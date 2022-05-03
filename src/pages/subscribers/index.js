import { useState } from 'react';
import { useSelector } from "react-redux";
import { AddSubscriber, SubscribersList } from "../../components/subscribers";
import { selectAllMails } from "../mails/mailsSlice";
import { Box, IconButton, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import MailToSend from '../../components/mails/mailToSend';

function Subscribers() {
  const mailToSend = useSelector(selectAllMails).find(mail => mail.fields.status === "toSend");
  const [openCollapse, setOpenCollapse] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ width: { xs: 8 / 10, md: 6 / 10 }, my: 2 }}>
        <span>Enter a new subscriber</span>
        <IconButton onClick={() => setOpenCollapse(!openCollapse)}>
          {!openCollapse ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
        <Collapse in={openCollapse}>
          <AddSubscriber />
        </Collapse>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2
      }}>
        <SubscribersList />
        {mailToSend ? <MailToSend {...{ ...mailToSend.fields, id: mailToSend.id }} /> :
          <MailToSend />
        }
      </Box>
    </Box>
  );
}

export default Subscribers;

import { useEffect, useState } from 'react';
import { AddSubscriber, SubscribersList } from "../../components/subscribers";
import { selectAllMails } from "../mails/mailsSlice";
import { Box, IconButton, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { MailToSend } from '../../components/mails/';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { fetchData } from '../../services/makeAirtableRequest';
import { Mail } from '../../types';

function Subscribers() {
  const [openCollapse, setOpenCollapse] = useState(false);
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(fetchData<Mail>('mails')());
  }, []); // eslint-disable-line

  const mailToSend = useReduxSelector(selectAllMails).find(mail => mail.fields.status === "toSend");
  return (
    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ width: { xs: 8 / 10, md: 6 / 10 }, my: 2 }}>
        <span>Enter a new subscriber</span>
        <IconButton color='primary' onClick={() => setOpenCollapse(!openCollapse)}>
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
        {mailToSend ? <MailToSend {...{ ...mailToSend }} /> :
          <MailToSend />
        }
      </Box>
    </Box>
  );
}

export default Subscribers;

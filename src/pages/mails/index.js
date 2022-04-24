import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllMails } from "./mailsSlice";
import MailsList from "../../components/mails/mailsList";

const Mails = () => {
   const mails = useSelector(selectAllMails);
   return (
      <Stack direction="row" spacing={5} paddingX={5}>
         <MailsList
            title="Working direktory"
            mails={mails.filter(mail => mail.fields.status !== "sent")}
         />
         <MailsList
            title="Sent mails"
            mails={mails.filter(mail => mail.fields.status === "sent")}
         />
      </Stack>
   )
}

export default Mails;
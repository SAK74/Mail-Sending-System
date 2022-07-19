import { Box } from "@mui/material";
import { selectAllMails } from "./mailsSlice";
import { MailsList } from '../../components/mails';
import { useReduxSelector } from "../../store";

const Mails = () => {
   const mails = useReduxSelector(selectAllMails);
   return (
      <Box sx={{
         display: "flex",
         flexWrap: "wrap",
         justifyContent: "center",
         gap: 2
      }}>
         <MailsList
            title="Working direktory"
            mails={mails.filter(mail => mail.fields.status !== "sent")}
         />
         <MailsList
            title="Sent mails"
            mails={mails.filter(mail => mail.fields.status === "sent")}
         />
      </Box>
   )
}

export default Mails;
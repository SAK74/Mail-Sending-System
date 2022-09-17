import { Backdrop, CircularProgress } from "@mui/material";
import { useReduxSelector } from "../../store";
import MailEditor from '../../components/mailEditor';
import SnackBar from "../snackBars/SnackBar";
import { Outlet } from "react-router-dom";

export function Dashboard() {
   const pendingSubscr = useReduxSelector(state => state.subscribers.status);
   const pendingMails = useReduxSelector(state => state.mails.status);
   return <div className="dashboard">
      <hr />
      <Outlet />
      <SnackBar />
      <Backdrop
         children={<CircularProgress />}
         open={pendingSubscr === "pending" || pendingMails === "pending"}
         invisible
         sx={{ zIndex: theme => theme.zIndex.modal + 1 }}
      />
      <MailEditor />
   </div>
}

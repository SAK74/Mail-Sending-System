import { Backdrop, CircularProgress } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { useReduxSelector } from "../../store";
import MailEditor from '../mailEditor';
import SnackBar from "../snackBars";

export default function Dashboard() {
   const pendingSubscr = useReduxSelector(state => state.subscribers.status);
   const pendingMails = useReduxSelector(state => state.mails.status);
   return <div className="dashboard">
      <nav>
         <NavLink to="/subscribers">Subscribers</NavLink>
         <NavLink to="mails">E-mails</NavLink>
      </nav>
      <hr />
      <SnackBar />
      <Outlet />
      <Backdrop
         children={<CircularProgress />}
         open={pendingSubscr === "pending" || pendingMails === "pending"}
         invisible
         sx={{ zIndex: theme => theme.zIndex.modal + 1 }}
      />
      <MailEditor />
   </div>
}
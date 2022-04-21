import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import MailEditor from '../mailEditor';
import SnackBar from "../snackBar";

export default function Dashboard() {
   const pendingSubscr = useSelector(state => state.subscribers.status);
   const pendingMails = useSelector(state => state.mails.status);
   // console.log(mailToSend);
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
         sx={{ zIndex: 1301, }}
      />
      <MailEditor />
   </div>
}
import { Backdrop, CircularProgress } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Outlet } from "react-router-dom";
import { useReduxSelector } from "../../store";
import MailEditor from '../mailEditor';
import SnackBar from "../snackBars";
import { TopPanel } from "./TopPanel";

export default function Dashboard({ changeMode }: { changeMode: Dispatch<SetStateAction<boolean>> }) {
   const pendingSubscr = useReduxSelector(state => state.subscribers.status);
   const pendingMails = useReduxSelector(state => state.mails.status);
   return <div className="dashboard">
      <TopPanel changeMode={changeMode} />
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "../../components/mails/singleMail";
import { fetchData } from "../../features/makeAirtableRequest";
import { selectAllMails } from "./mailsSlice";

const Mails = () => {
   const dispatch = useDispatch();
   const { status } = useSelector(state => state.mails);
   useEffect(() => {
      if (status === "iddle") {
         dispatch(fetchData("mails")());
      }
   }, []);
   const mails = useSelector(selectAllMails);
   console.log('mails: ', mails);
   return (
      <div className="mails">
         {mails.map(({ id, fields }, num) => <SingleMail key={id} {...{ ...fields, id, num }} />)}
      </div>
   )
}

export default Mails;
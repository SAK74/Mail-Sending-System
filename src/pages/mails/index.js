import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "../../components/mails/singleMail";
import { deleteItems, fetchData, update } from "../../features/makeAirtableRequest";
import { deleteMails, selectAllMails, updateMail } from "./mailsSlice";

const Mails = () => {
   const dispatch = useDispatch();
   const { status } = useSelector(state => state.mails);
   const [pending, setPending] = useState(false);
   useEffect(() => {
      if (status === "iddle") {
         dispatch(fetchData("mails")());
      }
   }, []);
   const mails = useSelector(selectAllMails);
   console.log('mails: ', mails);

   const handleCheck = ({ target: { checked } }, id) => {
      setPending(true);
      update("mails")(id, { fields: { selected: checked } })
         .then(data => dispatch(updateMail(data)))
         .finally(() => setPending(false));
   }
   const selectedMails = mails.filter(mail => mail.fields.selected);
   const handleDelete = () => {
      setPending(true);
      deleteItems("mails")(selectedMails.map(mail => mail.id))
         .then(data => dispatch(deleteMails(data.map(el => el.id))))
         .finally(() => setPending(false));
   }
   return (
      <div className="mails">
         {mails.map(({ id, fields }, num) => <SingleMail
            key={id}
            {...{ ...fields, id, num, pending }}
            handleCheck={ev => handleCheck(ev, id)}
         />)}
         <button onClick={handleDelete}>Delete selected</button>
      </div>
   )
}

export default Mails;
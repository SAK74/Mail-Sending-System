import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "../../components/mails/singleMail";
import { fetchData } from "../../features/makeAirtableRequest";
import { handleCheck, handleDelSelected } from "../../handlers";
import { selectAllMails } from "./mailsSlice";

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
   const selectedMails = mails.filter(mail => mail.fields.selected);

   return (
      <div className="mails">
         {mails.map(({ id, fields }, num) => <div key={id}>
            {num + 1}.
            <input type="checkbox"
               checked={!!fields.selected}
               onChange={ev => handleCheck("mails", setPending)(ev, id)}
               disabled={pending}
            />
            <SingleMail
               {...{ ...fields, id, num, pending }}
            // handleCheck={ev => handleCheck(ev, id)}
            />
         </div>
         )}
         <button onClick={() => handleDelSelected("mails", setPending)(selectedMails.map(mail => mail.id))}>
            Delete selected
         </button>
      </div>
   )
}

export default Mails;
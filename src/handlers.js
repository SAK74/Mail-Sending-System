import store from './store';
import { deleteItems, update } from './features/makeAirtableRequest';
import { deleteMails, updateMail } from './pages/mails/mailsSlice';
import { updateChecked, _deleteSubscribers } from './pages/subscribers/subscribersSlice';

export const handleCheck = (type, setPending) => ({ target: { checked } }, id) => {
   console.log("extend: ");
   setPending(true);
   update("subscribers")(id, { selected: checked })
      .then((data) => {
         console.log(data);
         store.dispatch(type === "subscribers" ? updateChecked(data) : updateMail(data));
      })
      .finally(() => setPending(false));
};

export const handleDelSelected = (type, setPending) => itemsID => {
   if (!confirm("Are You sure to delete selected items?!.")) { return undefined }
   setPending(true);
   deleteItems(type)(itemsID)
      .then((data) =>
         store.dispatch(type === "subscribers" ? _deleteSubscribers(data.map((subsc) => subsc.id))
            :
            deleteMails(data.map(mail => mail.id)))
      )
      .finally(() => setPending(false));
};
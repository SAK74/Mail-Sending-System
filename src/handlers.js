import store from './store';
import { addItem, deleteItems, update } from './features/makeAirtableRequest';
import { addMail, deleteMails, setStatusMails, updateMail } from './pages/mails/mailsSlice';
import { setStatusSubscr, updateChecked, _addSubscriber, _deleteSubscribers } from './pages/subscribers/subscribersSlice';
const dispatch = store.dispatch;

export const handleCheck = (type) => (checked, id) => {
   // console.log("extend: ");
   dispatch(type === "subscribers" ? setStatusSubscr("pending") : setStatusMails("pending"));
   update(type)(id, { selected: checked })
      .then((data) => {
         console.log(data);
         dispatch(type === "subscribers" ? updateChecked(data) : updateMail(data));
      })
      .finally(() => dispatch(type === "subscribers" ? setStatusSubscr("iddle") : setStatusMails("iddle"))
      );
};

export const handleDelSelected = (type) => itemsID => {
   if (!confirm("Are You sure to delete selected items?!.")) { return undefined }
   dispatch(type === "subscribers" ? setStatusSubscr("pending") : setStatusMails("pending"));
   deleteItems(type)(itemsID)
      .then((data) =>
         dispatch(type === "subscribers" ? _deleteSubscribers(data.map((subsc) => subsc.id))
            :
            deleteMails(data.map(mail => mail.id)))
      )
      .finally(() => dispatch(type === "subscribers" ? setStatusSubscr("iddle") : setStatusMails("iddle")));
};

export const handleAdd = type => data => {
   dispatch(setStatusSubscr("pending"));
   addItem(type)(data)
      .then(data =>
         dispatch(type === "subscribers" ? _addSubscriber(data) : addMail(data)))
      .finally(() => dispatch(setStatusSubscr("iddle")));

}
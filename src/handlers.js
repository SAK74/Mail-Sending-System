import store from './store';
import { addItem, deleteItems, update } from './features/makeAirtableRequest';
import { addMail, deleteMails, setStatusMails, updateMail } from './pages/mails/mailsSlice';
import { setStatusSubscr, updateSubscriber, _addSubscriber, _deleteSubscribers } from './pages/subscribers/subscribersSlice';
import { sendMail } from './features/makeMailgunRequest';
import { showSnack } from './components/snackBars/snackBarSlice';
const dispatch = store.dispatch;

export const handleUpdate = (type) => (id, data) => {
   dispatch(type === "subscribers" ? setStatusSubscr("pending") : setStatusMails("pending"));
   return update(type)(id, data)
      .then((data) => {
         console.log(data);
         dispatch(type === "subscribers" ? updateSubscriber(data) : updateMail(data));
      })
      .finally(() => dispatch(type === "subscribers" ? setStatusSubscr("iddle") : setStatusMails("iddle"))
      );
};

export const handleDelSelected = (type) => itemsID => {
   if (!itemsID.length) {
      alert("Neither item is't selected");
      return undefined;
   }
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
   return addItem(type)(data)
      .then(data => {
         dispatch(type === "subscribers" ? _addSubscriber(data) : addMail(data));
         return data.id;
      })
      .finally(() => dispatch(setStatusSubscr("iddle")));
}

export const handleSend = (mailToSend, selectedSubscr) => {
   if (!mailToSend) {
      const { mails } = store.getState();
      mailToSend = Object.values(mails.entities).find(subscr => subscr.fields.status === "toSend");
      if (!mailToSend) {
         alert("Neither mail is't selected");
         return undefined;
      }
   }
   if (!selectedSubscr?.length) {
      const { subscribers } = store.getState();
      selectedSubscr = Object.values(subscribers.entities).filter(subscr => subscr.fields.selected);
      if (!selectedSubscr?.length) {
         alert("Neither subscriber is't selected");
         return undefined;
      }
   }
   dispatch(setStatusSubscr("pending"));
   sendMail(selectedSubscr.map(subscr => subscr.fields), mailToSend.fields)
      .then(resSent => {
         const sentTo = selectedSubscr.filter((_, num) => resSent[num].status === 'fulfilled')
            .map(subscr => subscr.fields.name).join(", ");
         const dontSentTo = selectedSubscr.filter((_, num) => resSent[num].status === 'rejected')
            .map(subscr => subscr.fields.name).join(", ");
         if (sentTo) {
            dispatch(showSnack(`E-mail was sent to: ${sentTo}`));
            handleUpdate("mails")(mailToSend.id, { status: "sent" });
         }
         if (dontSentTo) dispatch(showSnack(`Dont sent to ${dontSentTo}`));
      })
      .finally(() => dispatch(setStatusSubscr("iddle")));
}

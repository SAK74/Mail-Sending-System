import store from './store';
import { addItem, deleteItems, update } from './features/makeAirtableRequest';
import { addMail, deleteMails, setStatusMails, updateMail } from './pages/mails/mailsSlice';
import { setStatusSubscr, updateSubscriber, _addSubscriber, _deleteSubscribers } from './pages/subscribers/subscribersSlice';
import { sendMail } from './features/makeMailgunRequest';
import { showSnack } from './components/snackBar/snackBarSlice';
const dispatch = store.dispatch;

export const handleUpdate = (type) => (id, data) => {
   dispatch(type === "subscribers" ? setStatusSubscr("pending") : setStatusMails("pending"));
   update(type)(id, data)
      .then((data) => {
         console.log(data);
         dispatch(type === "subscribers" ? updateSubscriber(data) : updateMail(data));
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
   return addItem(type)(data)
      .then(data => {
         dispatch(type === "subscribers" ? _addSubscriber(data) : addMail(data));
      })
      .finally(() => dispatch(setStatusSubscr("iddle")));
}

export const handleSend = () => {
   const { subscribers, mails } = store.getState();
   const selectedSubscr = Object.values(subscribers.entities).filter(subscr => subscr.fields.selected)
      .map(subscr => subscr.fields);
   const mailToSend = Object.values(mails.entities).find(mail => mail.fields.status === "toSend");
   console.log(mailToSend);
   dispatch(setStatusSubscr("pending"));
   sendMail(selectedSubscr, mailToSend.fields)
      .then(resSent => {
         const sentTo = selectedSubscr.filter((_, num) => resSent[num].status === 'fulfilled')
            .map(subscr => subscr.name).join(", ");
         dispatch(showSnack(`E-mail was sent to: ${sentTo}`));
         handleUpdate("mails")(mailToSend.id, { status: "sent" });
      })
      .finally(() => dispatch(setStatusSubscr("iddle")));
}
import store from './store';
import { addItem, deleteItems, update } from './services/makeAirtableRequest';
import { addMail, deleteMails, setStatusMails, updateMail } from './pages/mails/mailsSlice';
import { setStatusSubscr, updateSubscriber, _addSubscriber, _deleteSubscribers } from './pages/subscribers/subscribersSlice';
import { sendMail } from './services/makeMailgunRequest';
import { showSnack } from './pages/snackBars/snackBarSlice';
import { RequestType, Subscriber, Mail } from './types';
const dispatch = store.dispatch;

export const handleUpdate = <T extends Subscriber | Mail>(type: RequestType) =>
   (id: string, data: Partial<T['fields']>) => {
      dispatch(type === "subscribers" ? setStatusSubscr("pending") : setStatusMails("pending"));
      return update<T>(type)(id, data)
         .then((data) => {
            console.log(data);
            dispatch(type === "subscribers" ? updateSubscriber(data as Subscriber) : updateMail(data as Mail));
         })
         .finally(() => dispatch(type === "subscribers" ? setStatusSubscr("iddle") : setStatusMails("iddle"))
         );
   };

export const handleDelSelected = (type: RequestType) => (itemsID: string[]): undefined | void => {
   if (!itemsID.length) {
      alert("Neither item is't selected");
      return undefined;
   }
   if (!window.confirm("Are You sure to delete selected items?!.")) { return undefined }
   dispatch(type === "subscribers" ? setStatusSubscr("pending") : setStatusMails("pending"));
   deleteItems(type)(itemsID)
      .then((data) =>
         dispatch(type === "subscribers" ? _deleteSubscribers(data.map((subsc) => subsc.id))
            :
            deleteMails(data.map(mail => mail.id)))
      )
      .finally(() => dispatch(type === "subscribers" ? setStatusSubscr("iddle") : setStatusMails("iddle")));
};

export const handleAdd = (type: RequestType) => (data: Subscriber['fields'] | Mail['fields']) => {
   dispatch(setStatusSubscr("pending"));
   return addItem(type)(data)
      .then(data => {
         dispatch(type === "subscribers" ? _addSubscriber(data as Subscriber) : addMail(data as Mail));
         return data.id;
      })
      .finally(() => dispatch(setStatusSubscr("iddle")));
}

export const handleSend = (mailToSend?: Omit<Mail, "createdTime">, selectedSubscr?: Subscriber[]): void | undefined => {
   if (!mailToSend) {
      const { mails } = store.getState();
      mailToSend = Object.values(mails.entities).find(mail => mail?.fields.status === "toSend");
      if (!mailToSend) {
         alert("Neither mail is't selected");
         return undefined;
      }
   }
   if (!selectedSubscr?.length) {
      const { subscribers } = store.getState();
      selectedSubscr = Object.values(subscribers.entities).filter(subscr => subscr?.fields.selected) as Subscriber[];
      if (!selectedSubscr?.length) {
         alert("Neither subscriber is't selected");
         return undefined;
      }
   }
   dispatch(setStatusSubscr("pending"));
   sendMail(selectedSubscr.map(subscr => subscr.fields), mailToSend.fields)
      .then(resSent => {
         const sentTo = selectedSubscr!.filter((_, num) => resSent[num].status === 'fulfilled')
            .map(subscr => subscr.fields.name).join(", ");
         const dontSentTo = selectedSubscr!.filter((_, num) => resSent[num].status === 'rejected')
            .map(subscr => subscr.fields.name).join(", ");
         if (sentTo) {
            dispatch(showSnack({ message: `E-mail was sent to: ${sentTo}`, type: "info" }));
            handleUpdate<Mail>("mails")(mailToSend!.id, { status: "sent" });
         }
         if (dontSentTo) dispatch(showSnack({ message: `Dont sent to ${dontSentTo}`, type: "error" }));
      })
      .finally(() => dispatch(setStatusSubscr("iddle")));
}

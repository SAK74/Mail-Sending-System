import api from "../api";
import { mailText } from "./mailContent";

const defaultConfig = {
   url: "https://en94ayn8crcmn4i.m.pipedream.net",
   // headers: {
   //    Authorization: "...",
   // },
}
export const sendMail = subscribers => {
   const sending = subscribers.map(subscr => {
      const data = {
         from: "exitedUser@sandbox9a593161d9ef4be5b0bb14cf2696733a.mailgun.org",
         to: subscr.email,
         subject: "Hello",
         text: mailText.replace("<name>", subscr.name)
      };
      defaultConfig.data = data;
      return api.post(defaultConfig).then((data) => data);
   });
   return Promise.allSettled(sending)
      .then(res => {
         console.log(res);
         return res;
      });
}

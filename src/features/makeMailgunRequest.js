// import { connect, useSelector } from "react-redux";
import api from "../api";
// import { selectAll } from "../pages/subscribers/subscribersSlice";
// import { mailText } from "./mailContent";

const defaultConfig = {
   url: "https://en94ayn8crcmn4i.m.pipedream.net",
   // headers: {
   //    Authorization: "...",
   // },
}

export const sendMail = (subscribers, mail) => {
   const sendTo = subscribers.map(subscr => {
      const data = {
         from: "exitedUser@sandbox9a593161d9ef4be5b0bb14cf2696733a.mailgun.org",
         to: subscr.email,
         subject: mail.subject.replace(/<name>/gi, subscr.name),
         text: mail.content.replace(/<name>/g, subscr.name)
      };
      defaultConfig.data = data;
      return api.post(defaultConfig);
   });
   return Promise.allSettled(sendTo)
      .then(res => {
         console.log(res);
         return res;
      });
}

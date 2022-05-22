import api from "../api";
import { AxiosRequestConfig } from 'axios';
import { Mail, Subscriber } from "../types";

const defaultConfig: AxiosRequestConfig = {
   url: "https://en94ayn8crcmn4i.m.pipedream.net",
   // headers: {
   //    Authorization: "...",
   // },
}

export const sendMail = (subscribers: Subscriber['fields'][], mail: Mail['fields']) => {
   const sendTo = subscribers.map(subscr => {
      const data = {
         from: "exitedUser@sandbox9a593161d9ef4be5b0bb14cf2696733a.mailgun.org",
         to: subscr.email,
         subject: mail.subject ? mail.subject.replace(/<name>/gi, subscr.name) : "",
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

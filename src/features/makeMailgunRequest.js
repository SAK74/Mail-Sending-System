import api from "../api";
import { mailText } from "../components/mail";

const defaultConfig = {
   url: "https://en94ayn8crcmn4i.m.pipedream.net",
   // headers: {
   //    Authorization: "...",
   // },
}
export const sendMail = dataID => {
   const data = {
      from: "exitedUser@sandbox9a593161d9ef4be5b0bb14cf2696733a.mailgun.org",
      to: dataID.join(", "),
      subject: "Hello",
      text: mailText
   }
   return api.post(data, defaultConfig).then((data) => data);
}

import { useEffect } from "react";
import { saveMail } from "../features/makeMailRequest";

export default function CreateMail() {
   useEffect(() => { })
   const handleSubmit = (ev) => {
      ev.preventDefault();
      console.log(ev.target.content.value);
      saveMail({
         subject: "any",
         content: ev.target.content.value
      }).then(() => { });
   }
   return (
      <form onSubmit={handleSubmit}>
         <label htmlFor="mail">Edit E-mail: </label>
         <textarea id="mail" name="content"></textarea>
         <button type="submit">Save content</button>
      </form>
   )
}
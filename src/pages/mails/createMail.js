import { useEffect } from "react";
import { addItem } from "../../features/makeAirtableRequest";

export default function CreateMail() {
   useEffect(() => { })
   const handleSubmit = (ev) => {
      ev.preventDefault();
      console.log(ev.target.content.value);
      addItem("mails")({
         fields: {
            subject: "any",
            content: ev.target.content.value
         }
      }).then((data) => { console.log(data) });
   }
   return (
      <form onSubmit={handleSubmit}>
         <label htmlFor="mail">Edit E-mail: </label>
         <textarea id="mail" name="content"></textarea>
         <button type="submit">Save content</button>
      </form>
   )
}
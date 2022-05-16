export type Subscriber = {
   id: string,
   createdTime: string,
   fields: {
      email: string,
      name: string,
      selected: boolean,
   }
}
export type Mail = {
   id: string,
   createdTime: string,
   fields: {
      subject: string,
      content: string,
      selected: boolean,
      status: "sent" | "toSend" | "work"
   }
}
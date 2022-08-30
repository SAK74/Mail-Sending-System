import { rest } from 'msw';

export const handlers = [
   rest.get("subscribers", (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
         records: [
            {
               id: "recWNYFeg6RSWXsd7",
               createdTime: "2022-03-24T18:01:48.000Z",
               fields: {
                  selected: true,
                  email: "sergijks@gmail.com",
                  name: "Sergij",
                  created: "2022-03-24T18:01:48.000Z"
               }
            },
            {
               id: "recHQRyJSo28WmNc8",
               createdTime: "2022-03-24T18:02:27.000Z",
               fields: {
                  email: "example@ex.com",
                  name: "Example",
                  created: "2022-03-24T18:02:27.000Z"
               }
            },
            {
               id: "recGkAGXoYvtSc0KI",
               createdTime: "2022-03-27T21:33:13.000Z",
               fields: {
                  selected: true,
                  email: "imusia66@gmail.com",
                  name: "dddd",
                  created: "2022-03-27T21:33:13.000Z"
               }
            }
         ]
      })
   )),
   rest.get("mails", (req, resp, ctx) => resp(
      ctx.status(200),
      ctx.json({
         records: [
            {
               id: "recmaUpyjob1dzbmP",
               createdTime: "2022-03-24T18:01:48.000Z",
               fields: {
                  subject: "anything",
                  content: "ababagalamaga",
                  selected: true,
                  status: "work"
               }
            },
            {
               id: "rec2ZNQon7bWuQIrq",
               createdTime: "2022-03-24T18:02:27.000Z",
               fields: {
                  subject: "any2thing with some lonnnnnng title",
                  content: "khgcccababagalamagakjv\nUJYJTfutf\nSASASASA & very loooooong teeeeeeext",
                  status: "toSend"
               }
            },
            {
               id: "recWlGDtXQW4cUEYT",
               createdTime: "2022-03-27T21:33:13.000Z",
               fields: {
                  subject: "any3thing",
                  content: "ababababalalaga",
                  status: "sent"
               }
            }
         ]
      })
   ))
]
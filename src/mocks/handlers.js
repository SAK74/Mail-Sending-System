import { rest } from 'msw';

export const handlers = [
   rest.get("/subscribers", (req, res, ctx) => res(
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
               id: "recyTJ1QV64roO1Sn",
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
                  email: "imusia66@gmail.com",
                  name: "dddd",
                  created: "2022-03-27T21:33:13.000Z"
               }
            }
         ]
      })
   ))
]
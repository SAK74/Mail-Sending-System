const { default: axios } = require("axios");
const router = require("express").Router();
const qs = require("qs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const baseURL = "https://api.airtable.com/v0/appF2X0Cfc7mAqbqX/";
const SUBSCRIBERS = "tblViQAq6IJtOqql2/";
const MAILS = "tblvsDlpknazy2OFl/";

const useAxios = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  },
});

router.param("type", (req, resp, next, type) => {
  // console.log("router.param: ", type);
  console.log(process.env.APP_JWT_SECRET);
  console.log("Param cookie: ", req.cookies);
  req.airtableURL = type === "subscribers" ? SUBSCRIBERS : MAILS;
  jwt.verify(req.cookies.token, process.env.APP_JWT_SECRET, (err) => {
    if (err) {
      resp.status(401).send(err.message).end();
    } else next();
  });
});
router
  .route("/:type")
  .all((req, resp, next) => {
    // console.log("param: ", req.params);
    const { method, body, query } = req;
    const { id, ...reqBody } = body;
    // console.log("query: ", query);
    // console.log("body: ", body);
    useAxios({
      url: !id ? req.airtableURL : req.airtableURL + id,
      method,
      data: reqBody,
      params: query,
      paramsSerializer: (params) =>
        qs.stringify({ records: params }, { arrayFormat: "brackets" }),
      // headers: ,
    })
      .then((airtResp) => {
        // console.log("then: ", airtResp);
        resp.send(airtResp.data);
      })
      .catch((err) => {
        if (!err.response) {
          resp.status(500).send(err.message);
        } else {
          console.log(err.response.data);
          resp.status(err.response.status).send(err.response.data);
        }
      });
    // next();
  })
  .get((req, resp) => {});

module.exports = router;

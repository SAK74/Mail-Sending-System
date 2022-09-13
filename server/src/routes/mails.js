const { default: axios } = require("axios");
const router = require("express").Router();
const baseURL =
  "https://api.airtable.com/v0/appF2X0Cfc7mAqbqX/tblvsDlpknazy2OFl/";

router.get("/", (req, resp) => {
  console.log("mails!");
  axios(baseURL, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
  })
    .then((airtResp) => {
      //   console.log(airtResp);
      resp.send(airtResp.data);
    })
    .catch((err) => {
      if (!err.response) {
        resp.status(500).send(err.message);
      } else {
        console.log(err.response);
        resp.send(err.response.data);
      }
    });
  //   console.log(airtResp);
  //   resp.send("subscr");
});

module.exports = router;

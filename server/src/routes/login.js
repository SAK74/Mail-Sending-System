const express = require("express");
const router = express.Router();

router.get("/", (req, resp) => {
  resp.status(200).send({ test: "Is Ok" });
});
module.exports = router;

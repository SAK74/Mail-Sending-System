const express = require("express");
const router = express.Router();
require("dotenv").config();
const decode64 = require("../features/base64decode");
const jwt = require("jsonwebtoken");

router.get("/", (req, resp) => {
  // console.log("cookies: ", req.cookies);
  const auth = req.headers?.authorization?.split(" ");
  if (!auth || auth[0] !== "Basic") {
    resp.status(401).send("Wrong authorization method").end();
  } else {
    const [user, password] = decode64(auth[1]);
    // console.log("decoded: ", user, password);
    if (password === process.env.APP_PASSWORD) {
      const token = jwt.sign(user, process.env.APP_JWT_SECRET);
      // console.log("sent token: ", token);
      resp.status(200).cookie("token", token, { httpOnly: true }).send(token);
    } else {
      resp.status(401).send("Wrong password");
    }
  }
});
module.exports = router;

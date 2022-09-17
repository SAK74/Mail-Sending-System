const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || "4000";
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));
}
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://192.168.0.56:3000",
    "https://mail-sending-system.vercel.app/",
  ],
  credentials: true,
};

app.use(require("cors")(corsOptions));
app.use(express.json());
app.use(require("cookie-parser")());
app.use("/login", require("./routes/login"));
app.use("/api", require("./routes/api"));
// app.use("/mails", require("./routes/mails"));
app.listen(PORT, () => console.log(`Server started in port ${PORT}`));

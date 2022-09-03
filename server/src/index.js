const express = require("express");
const app = express();
const path = require("path");

const PORT = "4000";
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));
}

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://192.168.0.56:3000",
    "https://mail-sending-system.vercel.app/",
  ],
};

app.use(require("cors")(corsOptions));
app.use("/login", require("./routes/login"));
app.listen(PORT, () => console.log(`Server started in port ${PORT}`));

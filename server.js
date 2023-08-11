const express = require("express");
const helmet = require("helmet");
const path = require("path");

/* Routes */
const sendSms = require("./routes/send-sms");
const getSmsCredit = require("./routes/get-sms-credit");

/* Create App */
const app = express();

require("dotenv").config();
/* Pages */

const notFoundRoutePath = path.join(__dirname, "./public/pages/404.html");
const welcomePage = path.join(__dirname, "./public/pages/Running.html");

/* Middlewares */
app.use(express.static("public"));
app.use(express.json({ limit: "10MB" }));
app.use(helmet());

/* Routes */
app.get("/", (req, res) => {
  res.redirect("/ping");
});

app.get("/ping", (req, res) => {
  res.sendFile(welcomePage);
});

app.use("/api/sendSms", sendSms);
app.use("/api/getSmsCredit", getSmsCredit);

app.get("*", (req, res) => {
    res.status(404).sendFile(notFoundRoutePath);
  });

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

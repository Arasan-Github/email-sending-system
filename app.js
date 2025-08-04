const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config();
const PORT = 3000;
const PASSWORD = process.env.PASSWORD;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/send-email", (req, res) => {
  const { recipient, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jayaseelaarasan.f@gmail.com",
      pass: PASSWORD,
    },
  });
  const mailOptions = {
    from: "sender mail",
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error);
      res.status(500).send("Error in sending mail. Please try again later.");
    } else {
      console.log("Email sent", info.response);
      res.send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`The port is listening on: ${PORT}`);
});

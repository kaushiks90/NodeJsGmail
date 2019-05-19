const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const config = require('./config/config');
const app = express();

// Body Parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Test Message");
});

app.use(express.static(__dirname));
app.get("/download", (req, res) => {
  var resume = path.join(__dirname, "public", "Resume.docx");
  res.download(resume);
});

app.post("/sendEmail", (req, res) => {
  const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  var transporter = nodemailer.createTransport({

    host: config.transporter.host,
    port: config.transporter.port,
    secure: config.transporter.secure,
    auth: {
      user: config.auth.user,
      pass: config.auth.password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: config.mailOptions.from,
    to: config.mailOptions.to,
    subject: config.mailOptions.subject,
    text: "Hello world?",
    html: output
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send({
      Success: config.messages.success
    });
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
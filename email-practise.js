const nodemailer = require("nodemailer");

async function sendEmail() {
  // Create a transporter object using the default SMTP transport with Ethereal
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'violette.barton@ethereal.email',
        pass: 'bDtndsp7AE1YJAu82n'
    }
  });

  // Define email options
  let mailOptions = {
    from: '"Your Name" <violette.barton@ethereal.email>', // sender address
    to: "siddhkothari99@gmail.com", // list of receivers
    subject: "Hello from Node.js", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  // Send mail with defined transport object
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Execute the sendEmail function
sendEmail().catch(console.error);

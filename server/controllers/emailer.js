const nodemailer = require('nodemailer');

const email =  (auth, to, subject, html, text, req, next) => {
   //sender email
  const user = auth.user;
  const pass = auth.pass; //sender password
  const host = auth.host; //sender email provider
    const transporter = nodemailer.createTransport({
      host,
      port: 465,
      secure:true, // true for 465, false for other ports
      auth: {
          user, // SENDER USER
          pass   // SENDER PASS
      }
    });

    // setup email data with unicode symbols
    const mailOptions = {
        from: user, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html // html body
    };

    // send mail with defined transport object

  transporter.sendMail(mailOptions, (error, info) => {
    error ? req.sent  = "FAILED" : req.sent = 'SUCCESS';
    console.log(error);
    return next();
  });
};

  module.exports = {
    email
  };

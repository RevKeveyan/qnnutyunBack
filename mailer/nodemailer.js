const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rkeveyan23@gmail.com',
      pass: 'fqsxddmlrzhzblxv'
    }
  });

exports.mailer = (message)=> {
    transporter.sendMail(message, (err, info)=>{
        if(err) return console.log(err);
        console.log('Email sent ',info);
    });
}
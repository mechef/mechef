const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'donaldduck518@gmail.com',
    pass: '36jjiljjlRO',
  },
});

module.exports = transporter;

// setup email data with unicode symbols
// let mailOptions = {
//     from: '"Fred Foo 👻" <changable@blurdybloop.com>', // sender address
//     to: 'nkflyfly@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plain text body
//     html: '<b>Hello world ?</b>' // html body
// };
//
// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });

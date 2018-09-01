const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const constructorParam = {
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
};

const transporter = nodemailer.createTransport(constructorParam);

transporter.sendEmail = function(mailOptions, callback) {
  if (typeof mailOptions.from === 'undefined') {
    mailOptions.from = '"Mechef" <mechef@mechef.com>';
  }

  if (constructorParam.auth.user !== '' && constructorParam.auth.pass !== '') {
    transporter.sendMail(mailOptions, callback);
  } else {
    const error = null;
    const info = { messageId: -1, response: 'This is mock response' };
    callback(error, info);
  }
};

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

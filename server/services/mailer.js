'use strict';

const logger = require('log4js').getLogger('services/koscom');
const config = require('../config/index');
const mailer = require('nodemailer');

// create reusable transporter object using SMTP transport
const transporter = mailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

let MailerService = {
  sendMail: function sendMail(to, title, msg, cb) {
    // setup e-mail data with unicode symbols
    const mailOptions = {
      from: '개미의 선택 <ant.choice.team@gmail.com>', // sender address
      to: to, // list of receivers
      subject: title, // Subject line
      text: msg // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(err, info){
      if (cb) {
        logger.debug(info);
        return cb(err, info);
      }
    });
  }
};

module.exports = MailerService;


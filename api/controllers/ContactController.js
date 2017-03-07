/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport("SMTP", {
  service: "gmail",
  auth: {
    user: "gerardo.bw@gmail.com",
    pass: "gerileboLTD"
  }
});

module.exports = {

  contactInfo: function(req, res) {
    var required = ["email", "subject", "message"]
    var values = req.allParams();

    for (var i = 0; i < required.length; i++) {
      if (!required[i] in values) {
        return res.json({"status": 500})
      }
    }

    var mailOptions = {
      from: '👥 ' + req.param("email") + ' <gerardo.bw@gmail.com>', // sender address
      to: 'gerardo.bw@gmail.com', // list of receivers
      subject: req.param("subject"), // Subject line
      html: req.param("message") // html body
    };

    transport.sendMail(mailOptions, function(error, info) {
      if (error) {
        return res.json({"status": 500})
      } else {
        return res.json({"status": 200});
      }
      console.log('Message sent: ' + info.response);
    });
  }

};

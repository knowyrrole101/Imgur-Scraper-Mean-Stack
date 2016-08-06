var nodemailer = require('nodemailer');
var user = require('./api/user/user.controller.js')

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'moonahmed0617@gmail.com',
        pass: 'hackreactor1'
    }
});


exports.reset = function(req, res) {
    // setup e-mail
    var newPass = user.resetPassword(req.query.email);

    var mailOptions = {
        from: 'Moon Ahmed <moonahmed0617@gmail.com>', // sender address
        to: req.query.email,
        subject: 'New Password.', // Subject line
        html: '<b>Your new password is ' + newPass + '.  </b><a href="http://localhost:3000/login">Login here.</a>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });

    res.end();
};

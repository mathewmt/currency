const dbConfig = require('../../../config/database.config.js');

var nodemailer = require('nodemailer');

exports.about = (req, res) => {
    res.render('about_us',{baseurl:dbConfig.baseurl});
};
exports.contact = (req, res) => {

    res.render('contact',{baseurl:dbConfig.baseurl});
    
}; 
exports.sendmail = (req, res) => {  

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'currencydetection@gmail.com',
          pass: 'currency123#1'
        }
      });
      
      var mailOptions = {
        fname: req.body.fname,
        lname: req.body.lname,
        from: req.body.email,
        to: 'currencydetection@gmail.com',
        subject: 'note detection enquiry',
        text:  req.body.message
      };
      if(req.body.email=='')
      {
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.render('contact',{baseurl:dbConfig.baseurl,msg:'Email sending failed'});
        } else {
          console.log('Email sent: ' + info.response);
          res.render('contact',{baseurl:dbConfig.baseurl,msg:'Email sent successfully'});
           }
      });
    }
    else
    {
        res.render('contact',{baseurl:dbConfig.baseurl,msg:'Email sending failed'});
    }
    };
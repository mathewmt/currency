var express = require('express');
var app = express();
var fs = require('fs');
var session = require('express-session')
app.set('view engine','jade');
app.use(express.static('public'));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
var multer = require('multer');
var nodemailer = require('nodemailer');

//mongoose.connect('mongodb://localhost:27017/currency',{useUnifiedTopology: true,useNewUrlParser: true});
app.use(session({ secret: 'keyboard cat',proxy: true,resave: true,saveUninitialized: true, cookie: { maxAge: 600000 }}));
const dbConfig = require('./config/database.config.js');
mongoose.Promise = global.Promise;
require('./app/admin/routes/denomination.routes.js')(app);
require('./app/admin/routes/country.routes.js')(app);
require('./app/admin/routes/note.routes.js')(app);
require('./app/admin/routes/adminuser.routes.js')(app);
require('./app/user/routes/usernote.routes.js')(app);
require('./app/user/routes/static.routes.js')(app);
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
var Schema = mongoose.Schema;
    // SET STORAGE
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

  //uploading currencies

    app.post('/add_new_note', upload.fields([{
        name: 'homeimage', maxCount: 1
      }, {
        name: 'side1', maxCount: 1
      },{
        name: 'image1', maxCount: 1
      },{
        name: 'image2', maxCount: 1
      },{
        name: 'image3', maxCount: 1
      },{
        name: 'image4', maxCount: 1
      },{
        name: 'image5', maxCount: 1
      },{
        name: 'image6', maxCount: 1
      },{
        name: 'image7', maxCount: 1
      },{
        name: 'image8', maxCount: 1
      },{
        name: 'image9', maxCount: 1
      },{
        name: 'image10', maxCount: 1
      },{
        name: 'image11', maxCount: 1
      },{
        name: 'image12', maxCount: 1
      },{
        name: 'image13', maxCount: 1
      },{
        name: 'side2', maxCount: 1
      },{
        name: 'image14', maxCount: 1
      },{
        name: 'image15', maxCount: 1
      },{
        name: 'image16', maxCount: 1
      },{
        name: 'image17', maxCount: 1
      },{
        name: 'image18', maxCount: 1
      },]),(req, res, next) => {
        
                var countryId= req.body.countryId;
           // console.log("aaa",countryId);
           
            const file = req.files;
            

            const note          = require('./app/admin/models/note.model.js');
            const con           = require('./app/admin/models/country.model.js');
            const deno          = require('./app/admin/models/denomination.model.js');
        

            
            if (!file.homeimage) 
            {
                con.find({}, function(err, country) 
                {
                   console.log("nono,",country);
                    if(err) throw err;
                    var countrylist;
                    deno.find({countryid: countryId}, function(err, denomination) 
                    {
                        //console.log(country);
                        if(err) throw err;
                        var countrylist;
                        res.render('add_new_note',{countrylist: country,denominationlist: denomination,countryid:countryId});
                      
                    });
                    
                });
                
            }else
              {
               
                console.log("homeimage");

                if(file.homeimage)
                    var homeimage= file.homeimage[0].filename;
                    console.log("homeimage",homeimage);

                if(file.side1)
                    var side1= file.side1[0].filename;
                    console.log("homeimage",side1);

                if(file.side2)
                    var side2= file.side2[0].filename; 
                    console.log("homeimage",side2);                   


                var side1features = [];

                if(file.image1 &&  req.body.feature1)
                     side1features.push({feature: req.body.feature1,image:file.image1[0].filename});
                
                if(file.image2 &&  req.body.feature2)
                     side1features.push({feature: req.body.feature2,image:file.image2[0].filename}); 

                if(file.image3 &&  req.body.feature3)
                     side1features.push({feature: req.body.feature3,image:file.image3[0].filename});
                     
                if(file.image4 &&  req.body.feature4)
                     side1features.push({feature: req.body.feature4,image:file.image4[0].filename});
                     
                if(file.image5 &&  req.body.feature5)
                     side1features.push({feature: req.body.feature5,image:file.image5[0].filename}); 

                if(file.image6 &&  req.body.feature6)
                     side1features.push({feature: req.body.feature6,image:file.image6[0].filename}); 

                if(file.image7 &&  req.body.feature7)
                     side1features.push({feature: req.body.feature7,image:file.image7[0].filename}); 

                if(file.image8 &&  req.body.feature8)
                     side1features.push({feature: req.body.feature8,image:file.image8[0].filename}); 

                if(file.image9 &&  req.body.feature9)
                     side1features.push({feature: req.body.feature9,image:file.image9[0].filename}); 

                if(file.image10 &&  req.body.feature10)
                     side1features.push({feature: req.body.feature10,image:file.image10[0].filename}); 

                if(file.image11 &&  req.body.feature11)
                     side1features.push({feature: req.body.feature11,image:file.image11[0].filename}); 

                if(file.image12 &&  req.body.feature12)
                     side1features.push({feature: req.body.feature12,image:file.image12[0].filename}); 

                if(file.image13 &&  req.body.feature13)
                     side1features.push({feature: req.body.feature13,image:file.image13[0].filename}); 

            
             
                var side2features = [];


                if(file.image14 &&  req.body.feature14)
                     side2features.push({feature: req.body.feature14,image:file.image14[0].filename});
                
                if(file.image15 &&  req.body.feature15)
                     side2features.push({feature: req.body.feature15,image:file.image15[0].filename});

                if(file.image16 &&  req.body.feature16)
                     side2features.push({feature: req.body.feature16,image:file.image16[0].filename});

                if(file.image17 &&  req.body.feature18)
                     side2features.push({feature: req.body.feature17,image:file.image17[0].filename});

                if(file.image18 &&  req.body.feature15)
                     side2features.push({feature: req.body.feature18,image:file.image18[0].filename});
                  var data= note(
                      {
      
                        countryname: req.body.countryId,
                        denominationvalue: req.body.denominationvalue,
                        homeimage: homeimage,
                        side1: side1,
                        side1features: side1features,
                        side2: side2,
                        side2features: side2features
   
                  });
                  data.save(function (err,notes)
                 {
                 // console.log(notes);
                      if(err) throw err;
                      res.redirect('note_list');
                 });
                
                }
      });

var server = app.listen(5000, function () 
{
    console.log('Node server is running..');
});
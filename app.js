var express = require('express');
var app = express();
var fs = require('fs');
var session = require('express-session')
app.set('view engine','jade');
app.use(express.static('public'));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/uploads' }));
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
            
            console.log("helloooooooooooooo",file);
            






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







/*

app.get('/note_detail_view/:id',function(req,res){
    var obid= req.params.id;
    console.log(obid);
    note.findById(obid,function(err,result){
        if(err) throw err;

        console.log(";;;;;;;;;;;;;",result.denominationvalue);
        var obid = result.denominationvalue;
    deno.findById(obid,function(err,denomination){
            if(err) throw err;
        
        
        if(denomination.amount==500)
        res.render('note_detail_view_500',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features});
        if(denomination.amount==200)
        res.render('note_detail_view_200',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features});
        if(denomination.amount==50)
        res.render('note_detail_view_50',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features});
        if(denomination.amount==2000)
        res.render('note_detail_view_2000',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features});
        if(denomination.amount==20)
        res.render('note_detail_view_20',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features});
        if(denomination.amount==100)
        res.render('note_detail_view_100',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features});
        if(denomination.amount==10)
        res.render('note_detail_view_10',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features});
    });
});
   

});*/




/*

app.get('/homepage',function(req,res){

   
        note.find({countryname: "5e436ae777823942efabf62f"},function(err,notes)
            {
                if(err) throw err;
            res.render('homepage',{notelist: notes});
            });
    

    

});*/
/*
app.post('/homepage',function(req,res){

    var country = req.body.countryname;

    con.find({ "countryname": { $regex: '.*' + country + '.*' } }, function(err, countrylist)
    {
        console.log("qwertyqwerty",countrylist);
        if(err) throw err;
        if(countrylist[0])
        {
        var countryid = countrylist[0]._id;
       // res.send(countrylist[0].countryname);

        note.find({countryname:countryid},function(err,notes)
            {
            res.render('homepage',{notelist: notes});
            });
        }
        else
        {
            var notes=[];
            res.render('homepage',{notelist: notes});
        }
    });

    

});*/
/*
app.get('/readCountry',function(req,res)
{
    var country= req.query.searchterm;
    
    con.find({ "countryname": { $regex: '.*' + country + '.*' } }, function(err, countrylist)
    {
        console.log("qwertyqwerty",countrylist);
        if(err) throw err;
        if(countrylist[0])
        res.send(countrylist[0].countryname);
        else
        {
            res.send('');
        }
    });

});*/

    /*app.post('/select_country_note',function(req,res){
    
        if(req.session.name)
    {
        var countname= req.body.countryId;
        note.find({countryname: countname},function(err,notes)
        {
            if (err) throw err;
            res.render('note_list',{notelist: notes});
        });
    }else{
        res.redirect('/');
    }
    });
    app.get('/add_new_note/:countryname',function(req,res)
    {
        if(req.session.name)
    {
        var countryname= req.params.countryname;
        con.find({countryname: countryname },function(err,country)
        {
            if(err)  throw(err);
            res.render('add_new_note',{countryname: country});
        }
        );
        
    }else{
        res.redirect('/');
        }
    });*/

    /*app.post('/select_country_note',function(req,res){
    
        if(req.session.name)
    {
        var countname= req.body.countryId;
        deno.find({countryid: countname},function(err,denomination)
        {
            if(err) throw err;
            res.render('select_denomination_note',{denominationlist: denomination});
        });
    }else{
        res.redirect('/');
    }
});*/
        
   // res.render('home');
   /* var name = req.body.email + ' ' + req.body.lastName;

    req.session.fname = req.body.email;
     
    
    res.sendFile(__dirname + '/home.html');*/


/*app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});



app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});

*/
var server = app.listen(5000, function () 
{
    console.log('Node server is running..');
});
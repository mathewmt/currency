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
mongoose.connect('mongodb://localhost:27017/currency',{useUnifiedTopology: true,useNewUrlParser: true});
var Schema = mongoose.Schema;
var userschema =  new Schema(
    {
        name: {type: String, required: false},
        //name: {type: String, required: true,},
        email: {type: String, required: true},
        password: {type: String, required: true }
    });
    var user = mongoose.model('admins',userschema);
    //var schema = mongoose.Schema;
    var denominationSchema =  new Schema(
    {
        countryid: {type: String, required: true},
        amount: {type: Number, required: true},
    });
    var deno = mongoose.model('denomination',denominationSchema);

    var countrySchema =  new Schema(
        {
            countryname: {type: String, required: true},   
        });
        var con = mongoose.model('country',countrySchema);

    var noteschema= new Schema(
        {
            denominationvalue: {type: String},
            countryname: {type: String} ,
            homeimage: {type: String} ,
            side1: {type: String} ,
            side1features: [{feature: String,image: String}],
            side2: {type: String} ,
            
            side2features: [{feature: String,image: String}]
        }
    );
    var note = mongoose.model('notes',noteschema);


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

const dbConfig = require('./config/database.config.js');
mongoose.Promise = global.Promise;
//require('./app/routes/denomination.routes.js')(app);

app.use(session({ secret: 'keyboard cat',proxy: true,resave: true,saveUninitialized: true, cookie: { maxAge: 60000 }}));

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.get('/', function (req, res) {
   

    console.log(req.session.name);
	if (req.session.name) {
        res.redirect('/denomination')	;
	}
	else
    res.sendFile(__dirname + '/login.html');
});
//app.get('/admin-home', function (req, res) {
    
    /*res.sendFile(__dirname + '/home.html');
});*/
app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    //console.log(email);
    //console.log(password);
    user.find({$and:[{'username': email},{'password': password}]},function(err, users)
      
    {
        console.log(users);
        if(err) throw err;


       if (users && users.length) { 
           
           req.session.name =users[0].name;
           var name =  req.session.name;

        res.redirect('/denomination');
     } else {
        res.redirect('/');
        // empty
     }
       
       
    });

    function sayhi()
    {
        console.log("hi");
    }
    app.get('/denomination', function (req, res) 
    {
        if (req.session.name)
        {
            //var o = {}
        deno.find({},'countryid amount', function(err, denomination)
        {
            //denomination.push('countryname');
           // console.log("dddd",denomination);
            if(err) throw err;
            var denominationlist;
            
       
        con.find({}, function(err, countrylist)
        {
            console.log(2);
            console.log(countrylist);
            if(err) throw err;
            denomination = JSON.parse(JSON.stringify(denomination));
            for(var j=0;j<countrylist.length;j++)
            {
                for(var i = 0;i < denomination.length; i++)
                {
                    if(countrylist[j]._id==denomination[i].countryid)
                    {
                        denomination[i].countryname = countrylist[j].countryname;
                    }
                }
            }
            console.log(denomination);
         res.render('denomination',{denominationlist: denomination}); 
         });
        
        });


  
            
    }else
    {
        res.redirect('/');
    }
    });   
        
        });
               /* for(var i = 0; i < countrylist.length; i++)
                {
                    o['_id'] = [];
                    o['amount'] = [];
                    o['countryname'] =[];
                    
                    

                    for (var j= 0; j< denomination.length; j++)
                    {
                        if(countrylist[i]._id == denomination[j].countryid)
                        {
                           //denomination.push('countryname', countrylist[i].countryname);
                          // denomination.push('amount', denomination[j].amount);
                           //.push('amount', denomination[j].amount);
                           // countrylist[i]+"countryname" = countrylist[i].countryname; 
                          
                        }
                    }
                }


            console.log("aaaaaa"+denomination);

            res.render('denomination',{denominationlist: denomination});

        });
            
            });
        }else
        {
                res.redirect('/');
            }

   


    });*/
app.get('/deno_create',function (req,res)
{
    if(req.session.name)
    {
        con.find({}, function(err, country) 
        {
            console.log(country);
            if(err) throw err;
            var countrylist;
            res.render('deno_create',{countrylist: country});
        });
    
    }else{
        res.redirect('/');
    }
});
app.post('/deno_create',function (req,res)
{
    if(req.session.name)
    {
    var result = deno(
        {
        countryid : req.body.countryId,
        amount : req.body.amount
        });
        result.save(function (err,result)
           {
                if(err) throw err;
                res.redirect('denomination');
               // console.log('user created');
           });
           }else
           {
               res.redirect('/');
           }
    

});
app.get('/deno_edit/:id',function(req,res)
{
    console.log('get')
    if(req.session.name){
        var obid= req.params.id;
        deno.findById(obid,function(err,denomination)
        {
            //console.log("hfgjh"+denomination);
        if(err) throw err;
        res.render('deno_edit',{denominationlist: denomination});
        });
    }else{
        res.redirect('/');
    }
});
app.post('/deno_edit',function(req,res)
{ 
    if(req.session.name)
    {
          var obid = req.body.id;
          var result = 
            {
                countryid : req.body.countryId,
                 amount : req.body.amount
        
            }
            deno.findByIdAndUpdate({_id:obid},result,function(err,denomination){
                if(err) throw err;
                //console.log(user);
                res.redirect('denomination');
            });
        }else{
            res.redirect('/');
        }
    });
    app.get('/delete/:id',function(req,res)
{
    if(req.session.name)
    {
   var obid= req.params.id;
   deno.findByIdAndRemove(obid,function(err){
       if(err) throw err;
       res.redirect('/denomination');
   });
}else
{
    res.redirect('/');
}
});
app.get('/country_list',function(req,res){
if(req.session.name)
{
  con.find({},'countryname ', function(err, country) 
  {
      console.log(country);
      if(err) throw err;
      var countrylist;
      res.render('country_list',{countrylist: country});
  });
}else
{
    res.redirect('/');
}
}
);
app.get('/country_create',function(req,res){
    if(req.session.name)
    {
            
            res.render('country_create');
    }else
    {
        res.redirect('/');
    }
}
);
app.post('/country_create',function(req,res){
    if(req.session.name)
    {
        var result = con(
            {
                countryname : req.body.countryname,
               
            });
                var countryname = req.body.countryname;
                var countryid = req.body.countryId;
            con.find({'countryname': countryname},function(err,country)
            {
            if(err) throw err;
            if(country && country.length)
            {
                var msg ="country already existing";
                res.render('country_create',{message:msg});
            }else
            {
                result.save(function (err,result)
                {
                    if(err) throw err;
                    res.redirect('country_list');
    
                } ); 
            }
            });
            
        }else
        {
            res.redirect('/');
        }
    });

    app.get('/country_edit/:id',function(req,res)
    {
        if(req.session.name)
        {
            var obid= req.params.id;
            con.findById(obid,function(err,country)
            {
               // console.log('for update');
            if(err) throw err;
            res.render('country_edit',{countrylist: country});
            });
        }else{
            res.redirect('/');
        }
    });
    
    
    
    app.post('/country_edit',function(req,res)
    { 
    if(req.session.name)
    {
          var obid = req.body.id;
          var result = 
            {
                countryname : req.body.countryId,
                 
        
            }
            con.findByIdAndUpdate({_id:obid},result,function(err,denomination){
                if(err) throw err;
                //console.log(user);
                res.redirect('country_list');
            });
        }else{
            res.redirect('/');
        }
    });



    app.get('/country_delete/:id',function(req,res)
    {
        if(req.session.name)
        {
            
       var obid= req.params.id;
       con.findByIdAndRemove(obid,function(err){
           if(err) throw err;
           res.redirect('/country_list');
       });
    }else
    {
        res.redirect('/');
    }
    });


    app.get('/note_list',function(req,res){
        console.log("session namecountryId",req.session.name);
        if(req.session.name)
        {
    
            var country = req.params.countryId;
            var selectedcountry= null;
            console.log("condition",country);
            
                                note.find({},function(err,notes)
                                {
                                    console.log("qwertys",notes);
                                    if (err) throw err;
                                con.find({},function(err,countrylist)
                                {
                                    console.log("abcd"+countrylist);
                                    if (err) throw err;
                                    notes = JSON.parse(JSON.stringify(notes));
                                    for(var j=0;j<countrylist.length;j++)
                                    {
                                        for(var i=0;i < notes.length;i++)
                                        {
                                            if(countrylist[j]._id==notes[i].countryname)
                                            {
                                                notes[i].countrycode = countrylist[j].countryname;
                                                console.log(notes[i].countrycode);
                                            }
                                        }
                                    }
                                    
                                 
                                    
                                note.find({},function(err,noteslist)
                                {
                                    console.log("qwertys",noteslist);
                                    if (err) throw err;
                                deno.find({},function(err,denomination)
                                {
                                    console.log("abcd"+denomination);
                                    if (err) throw err;
                                    noteslist = JSON.parse(JSON.stringify(noteslist));
                                    for(var j=0;j<denomination.length;j++)
                                    {
                                        for(var i=0;i < noteslist.length;i++)
                                        {
                                            if(denomination[j]._id==noteslist[i].denominationvalue)
                                            {
                                                noteslist[i].denovalue = denomination[j].amount;
                                                console.log(denomination[j].amount);
                                            }
                                        }
                                    }
                                    console.log("last",notes);
                                    console.log("last",noteslist);
                                    res.render('note_list',{notelist: noteslist,noteli: notes,countrylist: countrylist,countryId:country});
                                });
                            });
                        });
                    });
        }else
        {
            res.redirect('/');
        }
   });




   app.post('/note_list',function(req,res){
    console.log("session namecountryId",req.session.name);
    if(req.session.name)
    {

        var country = req.body.countryId;
        console.log("mqmqmqmqmqm",country);
        if(country == "all")
        {
            note.find({},function(err,notes)
            {
                console.log("qwertys",notes);
                if (err) throw err;
            con.find({},function(err,countrylist)
            {
                console.log("abcd"+countrylist);
                if (err) throw err;
                notes = JSON.parse(JSON.stringify(notes));
                for(var j=0;j<countrylist.length;j++)
                {
                    for(var i=0;i < notes.length;i++)
                    {
                        if(countrylist[j]._id==notes[i].countryname)
                        {
                            notes[i].countrycode = countrylist[j].countryname;
                            console.log(notes[i].countrycode);
                        }
                    }
                }
                
                //console.log("last",notes);
                //res.render('note_list',{notelist: noteslist}); 
    
                
            note.find({},function(err,noteslist)
            {
                console.log("qwertys",noteslist);
                if (err) throw err;
            deno.find({},function(err,denomination)
            {
                console.log("abcd"+denomination);
                if (err) throw err;
                noteslist = JSON.parse(JSON.stringify(noteslist));
                for(var j=0;j<denomination.length;j++)
                {
                    for(var i=0;i < noteslist.length;i++)
                    {
                        if(denomination[j]._id==noteslist[i].denominationvalue)
                        {
                            noteslist[i].denovalue = denomination[j].amount;
                            console.log(denomination[j].amount);
                        }
                    }
                }

                console.log("last",notes);
                console.log("last",noteslist);
                res.render('note_list',{notelist: noteslist,noteli: notes,countrylist: countrylist,countryId:country});
            });
        });
    });
});  
        }else
        {
            note.find({countryname:country},function(err,notes)
            {
                console.log("qwertys",notes);
                if (err) throw err;
            con.find({_id:country},function(err,countrylist)
            {
                console.log("abcd"+countrylist);
                if (err) throw err;
                notes = JSON.parse(JSON.stringify(notes));
                for(var j=0;j<countrylist.length;j++)
                {
                    for(var i=0;i < notes.length;i++)
                    {
                        if(countrylist[j]._id==notes[i].countryname)
                        {
                            notes[i].countrycode = countrylist[j].countryname;
                            console.log(notes[i].countrycode);
                        }
                    }
                }
                
                //console.log("last",notes);
                //res.render('note_list',{notelist: noteslist}); 
    
                
            note.find({countryname:country},function(err,noteslist)
            {
                console.log("qwertys",noteslist);
                if (err) throw err;
            deno.find({countryid:country},function(err,denomination)
            {
                console.log("abcd"+denomination);
                if (err) throw err;
                noteslist = JSON.parse(JSON.stringify(noteslist));
                for(var j=0;j<denomination.length;j++)
                {
                    for(var i=0;i < noteslist.length;i++)
                    {
                        if(denomination[j]._id==noteslist[i].denominationvalue)
                        {
                            noteslist[i].denovalue = denomination[j].amount;
                            console.log(denomination[j].amount);
                        }
                    }
                }
                con.find({},function(err,countryli)
                                {
                                    console.log("abcd"+countryli);
                                    if (err) throw err;
                console.log("last",notes);
                console.log("last",noteslist);
                res.render('note_list',{notelist: noteslist,noteli: notes,countrylist: countryli,countryId:country});
                                });
            });
        });
    });
});
}      
}else
{
    res.redirect('/');
} 
    });
 



    app.get('/add_new_note',function(req,res){
    
        if(req.session.name)
        {
            con.find({}, function(err, country) 
            {
              //  console.log(country);
                if(err) throw err;
                var countrylist;
                res.render('add_new_note',{countrylist: country});
            });
        }else
        {
            res.redirect('/');
        }
    });






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
            








           var denominationvalue= req.body.denominationvalue;

            
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
                /*
                const error = new Error('Please upload a file')
                error.httpStatusCode = 400
                return next(error)*/
            }else
              {
                 /* var filearray ={}
                for(i=0;i<file.length;i++)
                {
                  filearray[i].image=file[i].filename;
                }*/
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



                /*file.forEach(function(item){
                    filearray.push({image:item.filename});
                  });*/

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
  
      app.get('/note_delete/:id',function(req,res)
    {
        if(req.session.name)
        {
       var obid= req.params.id;
       //console.log(obid);
       note.findByIdAndRemove(obid,function(err){
           if(err) throw err;
           res.redirect('/note_list');
       });
    }else
    {
        res.redirect('/');
    }
    });
   
    app.get('/note_view/:id/:denovalue',function(req,res)
    { 
    if(req.session.name)
    {
          var obid = req.params.id;
          console.log(obid);
          
            note.find({_id:obid},function(err,notes){
                if(err) throw err;
                console.log("view",notes[0].homeimage);
                var denominationvalue=  req.params.denovalue;
                res.render('note_view',{notelist:notes,denomination:denominationvalue});
            });
        }else{
            res.redirect('/');
        }
    });

    app.get('/logout',function(req,res)
    {
        if(req.session.name)
        {
            req.session.destroy(function(err)
            {
                if(err) throw err;
                res.redirect('/');
            });
        }else
        {
            res.redirect('/'); 
        }
    });









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
   

});






app.get('/homepage',function(req,res){

   
        note.find({countryname: "5e436ae777823942efabf62f"},function(err,notes)
            {
                if(err) throw err;
            res.render('homepage',{notelist: notes});
            });
    

    

});

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

    

});

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

});

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
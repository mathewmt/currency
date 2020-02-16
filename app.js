var express = require('express');
var app = express();
var fs = require('fs');
var session = require('express-session')
app.set('view engine','jade');
app.use(express.static('public'));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'keyboard cat',proxy: true,resave: true,saveUninitialized: true, cookie: { maxAge: 60000 }}));
require('./app/admin/routes/denomination.routes.js')(app);
//app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/uploads' }));
const mongoose = require('mongoose');
var multer = require('multer');
mongoose.connect('mongodb://localhost:27017/currency',{useUnifiedTopology: true,useNewUrlParser: true});
var Schema = mongoose.Schema;
var userschema =  new Schema(
    {
        name: {type: String, required: false},
        //name: {type: String, required: true,},
        username: {type: String, required: true},
        password: {type: String, required: true }
    });
    var user = mongoose.model('admins',userschema);
    //var schema = mongoose.Schema;
   /* var denominationSchema =  new Schema(
    {
        countryid: {type: String, required: true},
        amount: {type: Number, required: true},
    });
    var deno = mongoose.model('denomination',denominationSchema);

    var countrySchema =  new Schema(
        {
            countryname: {type: String, required: true},   
        });
        var con = mongoose.model('country',countrySchema);*/

    var noteschema= new Schema(
        {
            denominationvalue: {type: String},
            countryname: {type: String} ,
            images: [{image: String}]
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


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.get('/admin/', function (req, res) {
   

    console.log(req.session.fname);
	if (req.session.fname) {
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

        //console.log("aaaa",users[0].name);
           
           req.session.fname =users[0].name;

        res.redirect('/denomination');
     } else {
        res.redirect('/');
        // empty
     }
       
       
    })
    });
/*
    
    app.get('/denomination', function (req, res) 
    {
       
    });   */
        
    //    });
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
    /*
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
});*/
/*
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
    

});*/
/*{
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
*/
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

        if(req.session.fname)
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
                res.render('note_list',{notelist: noteslist,noteli: notes});
            });
        });
    });
});
        }else{
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






    app.post('/add_new_note', upload.array('image',12), (req, res, next) => {
        
        
            var countryId= req.body.countryId;
           // console.log("aaa",countryId);
          

         
            const file = req.files;
            
            if (!(file.length>0)) 
            {
                con.find({}, function(err, country) 
                {
                   // console.log("nono,",country);
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
                var filearray = [];


                file.forEach(function(item){
                    filearray.push({image:item.filename});
                  });

                  var data= note(
                      {
      
                        countryname: req.body.countryId,
                          denominationvalue: req.body.denominationvalue,
                          images: filearray
      
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
       note.findByIdAndRemove(obid,function(err){
           if(err) throw err;
           res.redirect('/note_list');
       });
    }else
    {
        res.redirect('/');
    }
    });
   
    app.get('/note_view/:id',function(req,res)
    { 
    if(req.session.name)
    {
          var obid = req.body.id;
          
            con.find({_id:obid},function(err,notes){
                if(err) throw err;
                //console.log(notes);
                res.render('note_view',{notelist: notes});
            });
        }else{
            res.redirect('/');
        }
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

const note          = require('../models/note.model.js');
const con           = require('../models/country.model.js');
const deno          = require('../models/denomination.model.js');

const dbConfig = require('../../../config/database.config.js');


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    if(req.session.fname)
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
                                    res.render('note_list',{notelist: noteslist,noteli: notes,countrylist: countrylist,countryId:country,baseurl:dbConfig.baseurl});
                                });
                            });
                        });
                    });
        }else
        {
            res.redirect('/admin');
        }
    };



    exports.findbycountry = (req, res) => {
        var obid= req.params.id;
    console.log(obid);
    note.findById(obid,function(err,result){
        if(err) throw err;

        console.log(";;;;;;;;;;;;;",result.denominationvalue);
        var obid = result.denominationvalue;
    deno.findById(obid,function(err,denomination){
            if(err) throw err;
        
        
        if(denomination.amount==500)
        res.render('note_detail_view_500',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==200)
        res.render('note_detail_view_200',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==50)
        res.render('note_detail_view_50',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==2000)
        res.render('note_detail_view_2000',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==20)
        res.render('note_detail_view_20',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==100)
        res.render('note_detail_view_100',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==10)
        res.render('note_detail_view_10',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
    });
});
    };

    
    exports.findbycountry = (req, res) => {
    if(req.session.fname)
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
    res.redirect('/admin');
}
    };

//add note
 exports.addnote = (req, res) => {
   if(req.session.fname)
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
            res.redirect('/admin');
        }
    };




//note delete
exports.notedelete = (req, res) => {
    if(req.session.fname)
    {
   var obid= req.params.id;
   //console.log(obid);
   note.findByIdAndRemove(obid,function(err){
       if(err) throw err;
       res.redirect('/note_list');
   });
}else
{
    res.redirect('/admin');
}
};


//note view
exports.noteview = (req, res) => {

if(req.session.fname)
{
      var obid = req.params.id;
      console.log(obid);
      
        note.find({_id:obid},function(err,notes){
            if(err) throw err;
            console.log("view",notes[0].homeimage);
            var denominationvalue=  req.params.denovalue;
            res.render('note_view',{notelist:notes,denomination:denominationvalue,baseurl:dbConfig.baseurl});
        });
    }else{
        res.redirect('/admin');
    }
};



//note view
exports.home = (req, res) => {

    note.find({countryname: "5e436ae777823942efabf62f"},function(err,notes)
    {
    if(err) throw err;
    res.render('homepage',{notelist: notes,baseurl:dbConfig.baseurl});
    });
    };




    exports.display = (req, res) => {

           
    var obid= req.params.id;
    console.log(obid);
    note.findById(obid,function(err,result){
        if(err) throw err;

        console.log(";;;;;;;;;;;;;",result.denominationvalue);
        var obid = result.denominationvalue;
    deno.findById(obid,function(err,denomination){
            if(err) throw err;
        
        
        if(denomination.amount==500)
        res.render('note_detail_view_500',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==200)
        res.render('note_detail_view_200',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==50)
        res.render('note_detail_view_50',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==2000)
        res.render('note_detail_view_2000',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==20)
        res.render('note_detail_view_20',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==100)
        res.render('note_detail_view_100',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
        if(denomination.amount==10)
        res.render('note_detail_view_10',{side1:result.side1,side2:result.side2,side1features:result.side1features,side2features:result.side2features,baseurl:dbConfig.baseurl});
    });
});
        };

        exports.readCountry = (req, res) => {

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
            };


            exports.homePost = (req, res) => {

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
                    res.render('homepage',{notelist: notes,baseurl:dbConfig.baseurl});
                    });
                }
                else
                {
                    var notes=[];
                    res.render('homepage',{notelist: notes,baseurl:dbConfig.baseurl});
                }
            });
};




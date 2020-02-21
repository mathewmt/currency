const con          = require('../models/country.model.js');

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    if(req.session.fname)
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
        res.redirect('/admin');
    }
    };



    // Create and Save a new Note
exports.create = (req, res) => {
    
    if(req.session.fname)
        {
                
                res.render('country_create');
        }else
        {
            res.redirect('/admin');
        }
};



// Create and Save a new Note
exports.createPost = (req, res) => {
    if(req.session.fname)
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
            res.redirect('/admin');
        }
   };


    // Create and Save a new Note
    exports.edit = (req, res) => {
        if(req.session.fname)
        {
            var obid= req.params.id;
            con.findById(obid,function(err,country)
            {
               // console.log('for update');
            if(err) throw err;
            res.render('country_edit',{countrylist: country});
            });
        }else{
            res.redirect('/admin');
        }
    };

    exports.update = (req, res) => {
        if(req.session.fname)
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
                res.redirect('/admin');
            }
    };


    exports.delete = (req, res) => {
        if(req.session.fname)
        {
            
       var obid= req.params.id;
       con.findByIdAndRemove(obid,function(err){
           if(err) throw err;
           res.redirect('/country_list');
       });
    }else
    {
        res.redirect('/admin');
    }
    };
const Denomination = require('../models/denomination.model.js');
const con          = require('../models/country.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    

    // Create a Note
    const denomination = new Denomination({
        amount: req.body.amount,
        countryid: req.body.countryId
    });

    // Save Note in the database
    denomination.save()
    .then(data => {
        res.redirect('denomination');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Create and Save a new Note
exports.createform = (req, res) => {

    
 if(req.session.fname)
    {
        con.find({}, function(err, country) 
        {
            console.log("aaaac",country);
            if(err) throw err;
            var countrylist;
            res.render('deno_create',{countrylist: country});
        });
    
    }else{
        res.redirect('/');
    }
};
 

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
     if (req.session.fname)
        {
            //var o = {}
        Denomination.find({},'countryid amount', function(err, denomination)
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
//res.sendFile('../../denominations.html');
//res.sendFile('denominations.html', { root: '/var/node/currency' });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {


    if(req.session.fname)
    {
   var obid= req.params.denominationId;
   Denomination.findByIdAndRemove(obid,function(err){
       if(err) throw err;
       res.redirect('/denomination');
   });
    }else
    {
        res.redirect('/');
    }


};
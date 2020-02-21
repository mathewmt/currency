const user          = require('../models/adminuser.model.js');

// Retrieve and return all notes from the database.
    exports.formDisplay = (req, res) => {
    
        console.log(req.session.fname);
        if (req.session.fname) {
            res.redirect('/denomination')	;
        }
        else
        res.sendFile('login.html', { root:'./'});
    };

    exports.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    //console.log(email);
    //console.log(password);
    user.find({$and:[{'username': email},{'password': password}]},function(err, users)
    {
        console.log(users);
        if(err) throw err;


       if (users && users.length) { 
           
           req.session.fname =users[0].name;
           var name =  req.session.name;

        res.redirect('/denomination');
     } else {
        res.redirect('/admin');
        // empty
     }
       
       
    });
    };

    exports.logout = (req, res) => {
    
        if(req.session.fname)
        {
            req.session.destroy(function(err)
            {
                if(err) throw err;
                res.redirect('/admin');
            });
        }else
        {
            res.redirect('/admin'); 
        }
    
    };

   
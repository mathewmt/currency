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
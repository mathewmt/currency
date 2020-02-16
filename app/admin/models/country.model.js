const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    countryname: {type: String, required: true}
});

module.exports =  mongoose.model('country',countrySchema);

 
const mongoose = require('mongoose');

const noteschema = mongoose.Schema({
    denominationvalue: {type: String},
    countryname: {type: String} ,
    homeimage: {type: String} ,
    side1: {type: String} ,
    side1features: [{feature: String,image: String}],
    side2: {type: String} ,
    
    side2features: [{feature: String,image: String}]
});

module.exports = mongoose.model('notes', noteschema);



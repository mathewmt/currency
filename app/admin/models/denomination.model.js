const mongoose = require('mongoose');

const DenominationSchema = mongoose.Schema({
    amount: String,
    countryid: String
});

module.exports = mongoose.model('denomination', DenominationSchema);
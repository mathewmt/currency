const mongoose = require('mongoose');

const DenominationSchema = mongoose.Schema({
    amount: String,
    countryId: String
});

module.exports = mongoose.model('denomination', DenominationSchema);
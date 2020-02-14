const Denomination = require('../models/denomination.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    

    // Create a Note
    const denomination = new Denomination({
        amount: req.body.amount,
        countryId: req.body.countryId
    });

    // Save Note in the database
    denomination.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
//res.sendFile('../../denominations.html');
res.sendFile('denominations.html', { root: '/var/node/currency' });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};
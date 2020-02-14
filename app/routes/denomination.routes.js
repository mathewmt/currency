module.exports = (app) => {
    const denomination = require('../controllers/denomination.controller.js');

    // Create a new Note
    app.post('/create', denomination.create);

    //app.get('/create', denomination.create);

    app.get('/create', function (req, res) {
    
    res.sendFile('create.html', { root: '/var/node/currency' });
});
    // Retrieve all Notes
    app.get('/denominations', denomination.findAll);

    // Retrieve a single Note with noteId
    app.get('/denomination/:denominationId', denomination.findOne);

    // Update a Note with noteId
    app.put('/denomination/:denominationId', denomination.update);

    // Delete a Note with noteId
    app.delete('/denomination/:denominationId', denomination.delete);
}
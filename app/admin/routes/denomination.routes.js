module.exports = (app) => {
    const denomination = require('../controllers/denomination.controller.js');

    // Create a new Note
    app.post('/deno_create', denomination.create);

    //app.get('/create', denomination.create);
  

    app.get('/deno_create',denomination.createform);
    // Retrieve all Notes
    app.get('/denomination', denomination.findAll);

    // Retrieve a single Note with noteId
   // app.get('/denomination/:denominationId', denomination.findOne);

    // Update a Note with noteId
    //app.put('/denomination/:denominationId', denomination.update);

    // Delete a Note with noteId
    app.get('/denodelete/:denominationId', denomination.delete);
}
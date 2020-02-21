module.exports = (app) => {
    const country = require('../controllers/country.controller.js');

   
    // Retrieve all Notes
    app.get('/country_list', country.findAll);

    app.get('/country_create',country.create);

    app.post('/country_create', country.createPost);

    app.get('/country_edit/:id', country.edit);

    app.post('/country_edit', country.update);

    app.get('/country_delete/:id', country.delete);

   



}
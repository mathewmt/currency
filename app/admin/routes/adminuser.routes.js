module.exports = (app) => {
    const admin = require('../controllers/adminuser.controller.js');

   
    // Retrieve all Notes
    app.get('/admin', admin.formDisplay);
    app.post('/admin/login', admin.login);
    app.get('/logout', admin.logout);

   



}
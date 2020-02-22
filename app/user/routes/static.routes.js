module.exports = (app) => {
    const stat = require('../controller/static.controller.js');

    //about page
    app.get('/about_us',stat.about);
    app.get('/contact',stat.contact);
  //  app.get('/contact_us',stat.contact_us1);
    app.post('/contact',stat.sendmail);

    
}

module.exports = (app) => {
    const note1 = require('../../admin/controllers/note.controller.js');

   
    // Retrieve all Notes
    app.get('/note_detail_view/:id',note1.display);
    app.get('/',note1.home);
    app.post('/',note1.homePost);

    app.get('/readCountry',note1.readCountry);


    

   



}
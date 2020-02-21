module.exports = (app) => {
    const note = require('../controllers/note.controller.js');

   
    // Retrieve all Notes
    app.get('/note_list', note.findAll);
    // Retrive by Country
    app.post('/note_list', note.findbycountry);
    //add new note
    app.get('/add_new_note', note.addnote);
     
   // app.post('/add_new_note', note.addnotePost);


    
    

    //Delete node
    app.get('/note_delete/:id', note.notedelete);

    //note view
    app.get('/note_view/:id/:denovalue', note.noteview);

  


  
  

}
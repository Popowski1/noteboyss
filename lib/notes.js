const path = require('path');
const fs = require('fs');

function createNewNote(body , notesArray){
 const note = body;
 notesArray.push(note);
 fs.writeFileSync(path.join(__dirname, '../db/notes.json'),
 JSON.stringify({notesArray}, null, 2)
 );
 return note;
}
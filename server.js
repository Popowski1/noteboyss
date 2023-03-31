const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notesArray = require('./db/notes.json');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notesArray);
});

app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, './public/notes.html'))});

function createNewNote(body , notesArray){
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/notes.json'),
    JSON.stringify(notesArray)
    );
    return newNote;
   }

   app.post('/api/notes', (req,res) => {
    const newNote = createNewNote(req.body, notesArray);
    res.json(newNote);
});

app.get('/public/assets/js/index.js', (req, res) => {
res.sendFile(path.join(__dirname, './public/assets/js/index.js'))})

app.get('/public/assets/css/styles.css', (req, res) => {
res.sendFile(path.join(__dirname, './public/assets/css/styles.css'))})

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, './public/index.html'))});


app.delete('/notes:id', async(req,res) => {
const {id} = req.params
notesArray = await deleteNote(id, notesArray);
res.json(notesArray);
});






function deleteNote(id, notes) {
let notesArray = notes.filter(el => {
    if (el.id ==id) {
        return false
    } else {
        return true
    }
})
let index = 0;
notesArray.forEach(note =>{
note.id = index;
index += 1;
});
fs.writeFileSync(path.join(__dirname, 'db/notes.json'),
JSON.stringify({notesArray}, null, 2));
return notesArray;
};






app.listen(PORT, () => {console.log('Server on ${PORT}');
});
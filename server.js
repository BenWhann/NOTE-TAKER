const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    console.log('Index Rendered');
    res.render('index.ejs');
});

const notesRouter = require('./routes/notes.js');
app.use("/notes", notesRouter);

app.listen(3001);

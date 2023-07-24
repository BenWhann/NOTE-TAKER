const express = require('express');
const app = express();
const notes = require('./routes/notes');
const htmlRoutes = require('./routes/html');
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api", notes);
app.use('/', htmlRoutes);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);

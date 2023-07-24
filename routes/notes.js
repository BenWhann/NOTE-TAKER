const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

router.get('/notes', (req, res) => {
    readFromFile('db/db.json', 'utf-8')
    .then((notes) => {
        return JSON.parse(notes);
    })
    .then((data) => {
        return res.json(data);
    })
});


router.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

    readAndAppend(newNote, './db/db.json');
    res.json(`New note added`);
    } else {
    res.error('There was an error');
    }
});

// Attempted delete request

// router.delete('/:id', (req, res) => {
//     const noteId = req.params.id;
//     readFromFile('./db/db.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
        
//         const result = json.filter((note) => note.id !== noteId);
  
//         writeToFile('./db/db.json', result);
  
//         res.json(`Item ${noteId} has been deleted 🗑️`);
//       });
//   });


module.exports = router;
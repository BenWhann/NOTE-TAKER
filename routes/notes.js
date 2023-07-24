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
    // console.log('Notes Rendered');
    // res.render('notes');
    readFromFile('db/db.json', 'utf-8')
    .then((notes) => {
        return JSON.parse(notes);
    })
    .then((data) => {
        return res.json(data);
    })
});

// inside of route add note. 
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


module.exports = router;
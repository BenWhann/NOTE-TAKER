const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/notes', (req, res) => {
    console.log('Notes Rendered');
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
    console.log('Index Rendered');
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
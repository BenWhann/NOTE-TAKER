const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Notes Rendered');
    res.render('notes');
});

module.exports = router;
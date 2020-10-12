const express = require('express');
const config = require('../../config');
const path = require('path');


const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/index.html'));
});

module.exports = router;
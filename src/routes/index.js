const express = require('express');
const config = require('../../config');
const path = require('path');


const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/index.html'));
});

router.get('/bisection', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/bisection.html'));
});

module.exports = router;
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

router.get('/false', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/falsa.html'));
});

router.get('/incremental', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/incremental.html'));
});

router.get('/pfijo', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/pfijo.html'));
});

router.get('/newton', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/newton.html'));
});

router.get('/secante', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/secante.html'));
});

router.get('/multi_root', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/multi_root.html'));
});

module.exports = router;
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

router.get('/gauss_s', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/gaussSimple.html'));
});

router.get('/gauss_p', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/gaussParcial.html'));
});

router.get('/gauss_t', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/gaussTotal.html'));
});

router.get('/fact_lu_s', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/fact_lu_s.html'));
});

router.get('/fact_lu_p', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/fact_lu_p.html'));
});

router.get('/seidel', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/seidel.html'));
});

router.get('/jacobi', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/jacobi.html'));
});

router.get('/sor', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/sor.html'));
});

module.exports = router;
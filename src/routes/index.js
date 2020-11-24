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

router.get('/lagrange', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/lagrange.html'));
});

router.get('/new_inter', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/new_inter.html'));
});

router.get('/vander', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/vander.html'));
});

router.get('/trazlin', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/trazlin.html'));
});

router.get('/trazcuad', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/trazcuad.html'));
});

router.get('/trazcub', (req, res) => {
    res.sendFile(path.join(config.AppPath, 'src/views/trazcub.html'));
});

module.exports = router;
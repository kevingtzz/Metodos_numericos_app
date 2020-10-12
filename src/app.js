const express = require('express');
const path = require('path');

const config = require('../config');
const app = express();

// settings
app.set('port', config.port);

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}`);
});
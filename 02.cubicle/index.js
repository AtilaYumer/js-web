const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const app = express();
const dbConnect = require('./config/database');

require('./config/express')(app);
require('./config/routes')(app);
require('./config/database');

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
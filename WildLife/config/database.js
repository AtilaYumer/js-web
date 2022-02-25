const mongoose = require('mongoose');

require('../models/User');
require('../models/Post');

connect().catch(err => console.log(err));

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/wildlife', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    });
    console.log('Database connected');
}
const mongoose = require('mongoose');

require('../models/Cube');

connect().catch(err => console.log(err));

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/cubicue', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Database connected');
}
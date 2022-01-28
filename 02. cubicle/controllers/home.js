const fs = require('fs');
const path = require('path');
const Cube = require('../models/Cube')

function getAllCubes() {
    return JSON.parse(fs.readFileSync('./config/database.json').toString());
}

module.exports = {
    render: (req, res) => {
        const cubes = getAllCubes();
        res.render('index', { cubes: cubes });
    }
}
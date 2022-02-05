const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.engine('.hbs', handlebars.create({ extname: '.hbs'}).engine);
    app.set('view engine', '.hbs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/content', express.static('static'))
};
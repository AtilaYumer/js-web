const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.engine('.hbs', handlebars.create({ 
        extname: '.hbs',
        helpers: {
            isEqual: function(value1, value2) {
                if (value1 == value2) {
                    return true;
                }
                return false;
            }
        }
     }).engine);
    app.set('view engine', '.hbs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/content', express.static('static'));
    app.use(cookieParser());
};
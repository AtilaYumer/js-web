const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.engine('.hbs', handlebars.create({
        extname: '.hbs',
        helpers: {
            isUserIdEqual: function (sessionUserId, actualUserId) {
                if (sessionUserId == actualUserId.toString()) {
                    return true;
                }
                return false;
            },
            isApplied: function (applications, userId) {
                return applications.some(candiate => candiate._id.toString() === userId);
            }
        }
    }).engine);
    app.set('view engine', '.hbs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(cookieParser());
};
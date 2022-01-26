const controllers = require('../controllers');


module.exports = (app) => {
    app.get('/', controllers.home.render),
    app.get('/create', controllers.cube.renderCreate),
    app.get('/details/:id', controllers.cube.renderDetails),
    app.get('/about', (req, res) => {
        res.render('about');
    });
    app.get('/*', (req, res) => {
        res.render('404');
    })
};
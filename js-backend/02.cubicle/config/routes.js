const controllers = require('../controllers');
const { authenticateToken } = require('../util/authorizationUtil');


module.exports = (app) => {
    app.use('/users', authenticateToken(), controllers.userController);
    
    app.get('/', authenticateToken(), controllers.home.render);

    app.use('/cubes', authenticateToken(), controllers.cubeController);

    app.use('/accessories', authenticateToken(), controllers.accessoryController)

    app.get('/about', authenticateToken(), (req, res) => {
        res.render('about');
    });

    app.get('/*', (req, res) => {
        res.render('404');
    });
};
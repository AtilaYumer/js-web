const controllers = require('../controllers');
const { authenticateToken } = require('../util/authorizationUtil')


module.exports = (app) => {
    app.get('/', authenticateToken(), controllers.home.render);

    app.route('/create')
        .get(authenticateToken(), controllers.cube.renderCreate)
        .post(authenticateToken(), controllers.cube.createCub);

    app.get('/details/:id', authenticateToken(), controllers.cube.renderDetails);

    app.route('/edit/:id')
        .get(authenticateToken(), controllers.cube.renderEdit)
        .post(authenticateToken(), controllers.cube.edit);

    app.route('/delete/:id')
        .get(authenticateToken(), controllers.cube.renderDelete)
        .post(authenticateToken(), controllers.cube.delete);

    app.route('/attach/accessory/:id')
        .get(authenticateToken(), controllers.cube.renderAttachAccessoryView)
        .post(authenticateToken(), controllers.cube.attachAccessory);

    app.route('/create/accessory')
        .get(authenticateToken(), controllers.accessory.render)
        .post(authenticateToken(), controllers.accessory.create);

    app.route('/register')
        .get(authenticateToken(), controllers.user.renderRegister)
        .post(authenticateToken(), controllers.user.register);

    app.route('/login')
        .get(authenticateToken(), controllers.user.renderLogin)
        .post(authenticateToken(), controllers.user.login);

    app.get('/logout', authenticateToken(), controllers.user.logout);

    app.get('/about', authenticateToken(), (req, res) => {
        res.render('about');
    });

    app.post('/search', authenticateToken(), controllers.cube.search);

    app.get('/*', (req, res) => {
        res.render('404');
    });
};
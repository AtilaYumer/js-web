const controllers = require('../controllers');
const { isLoggedIn } = require('../util/tokenUtil');


module.exports = (app) => {
    app.use('/', isLoggedIn(), controllers.homeController);

    app.use('/users', isLoggedIn(), controllers.userController);

    app.use('/ads', isLoggedIn(), controllers.adsController);

    app.get('/*', isLoggedIn(), (req, res) => {
        res.render('404');
    });
};
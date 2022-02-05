const controllers = require('../controllers');


module.exports = (app) => {
    app.get('/', controllers.home.render),
    app.get('/create', controllers.cube.renderCreate),
    app.post('/create', controllers.cube.createCub),
    app.get('/details/:id', controllers.cube.renderDetails),
    
    app.get('/attach/accessory/:id', controllers.cube.renderAttachAccessoryView),
    app.post('/attach/accessory/:id', controllers.cube.attachAccessory),

    app.get('/create/accessory', controllers.accessory.render),
    app.post('/create/accessory', controllers.accessory.create),
    
    app.get('/about', (req, res) => {
        res.render('about');
    }),
    app.post('/search', controllers.cube.search),
    app.get('/*', (req, res) => {
        res.render('404');
    })
};
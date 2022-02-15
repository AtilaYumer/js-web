const User = require('../models/User');
const jwtUtil = require('../util/jwtUtil');

module.exports = {
    renderRegister: (req, res) => {
        res.render('registerPage');
    },

    register: async (req, res) => {
        const body = req.body;
        const existingUser = await User.findOne({ username: body.username });
        if (existingUser) {
            res.status(409);
            res.render('registerPage');
            return;
        } else if (body.password !== body.repeatPassword) {
            res.status(400);
            res.render('registerPage');
            return;
        }
        const user = new User({
            username: body.username,
            password: body.password
        });
        await user.save();
        res.redirect('/login')
    },

    renderLogin: (req, res) => {
        res.render('loginPage');
    },

    login: async (req, res) => {
        const body = req.body;
        const user = await User.findOne({ username: body.username });
        const isPasswordValid = user.comparePassword(body.password);
        if (!isPasswordValid) {
            res.status(400);
            res.render('loginPage');
            return;
        }
        const token = jwtUtil.generate(user);
        res.cookie('authToken', token);
        res.redirect('/');
    },

    logout: (req, res) => {
        res.clearCookie('authToken');
        res.redirect('/login');
    }
}
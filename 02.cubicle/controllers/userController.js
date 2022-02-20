const User = require('../models/User');
const jwtUtil = require('../util/jwtUtil');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const userService = require('../services/userService');

const router = Router();

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.post('/register',
    body('username')
        .trim()
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long.')
        .isAlphanumeric().withMessage('Username must contain only alpha numeric characters.')
        .custom(async (value) => {
            const user = await userService.getUserByUsername(value);
            if (user) {
                throw new Error('Username already exists');
            }
            return true;
        }),
    body('password').trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .isAlphanumeric().withMessage('Password must contain only alpha numeric characters.'),
    body('repeatPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Repeat password does not match the password.')
        }
        return true;
    }),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            userService.createUser(req.body);
            res.redirect('/users/login')
        } catch (errors) {
            res.render('registerPage', {
                errors,
                data: {
                    username: req.body.username,
                    password: req.body.password,
                    repeatPassword: req.body.repeatPassword
                }
            });
        }
    });

router.get('/login', (req, res) => {
    res.render('loginPage');
});


router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ username: body.username });
        const isPasswordValid = await user.comparePassword(body.password);
        if (!isPasswordValid) {
            throw new Error('Username or password not valid.');
        }
        const token = jwtUtil.generate(user);
        res.cookie('authToken', token);
        res.redirect('/');
    } catch (e) {
        const errors = [{ msg: e.message }];
        res.status(401).render('loginPage', { errors: errors, data: req.body })
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/users/login');
});

module.exports = router;
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const userService = require('../services/userService');
const bcryptUtil = require('../util/bcryptUtil');
const jwtUtil = require('../util/jwtUtil');
const { isUser, isGuest } = require('../util/tokenUtil');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { active: 'register' });
});

router.post('/register',
    body('email').trim()
        .matches(/^[a-z]+@[a-z]+\.[a-z]+$/i).withMessage('Email not in valid format.'),
    body('password').trim()
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.'),
    body('repeatPassword').trim()
        .custom((value, { req }) => {
            return value === req.body.password
        }).withMessage('Repeat password does not match the password!'),
    body('skills').trim()
        .notEmpty().withMessage('Skills are required.')
        .isLength({ max: 40 }).withMessage('Skills cannot be longer than 40 characters.'),
    body('email').custom(async value => {
        const user = await userService.findUserByEmail(value);
        if (user) {
            throw new Error('Email is already in use.');
        }
        return true;
    }),
    isGuest(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const user = await userService.createUser(req.body);
            const token = jwtUtil.generateToken(user);
            res.cookie('authToken', token);
            res.redirect('/');
        } catch (errors) {
            res.render('register', {
                errors, data: {
                    email: req.body.email,
                    password: req.body.password,
                    repeatPassword: req.body.repeatPassword,
                    skills: req.body.skills
                },
                active: 'register'
            });
        }
    });

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { active: 'login' });
});

router.post('/login',
    body('email').trim()
        .notEmpty().withMessage('Please enter email'),
    body('password').trim()
        .notEmpty().withMessage('Please enter password'),
    isGuest(), async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const user = await userService.findUserByEmail(req.body.email);
            if (!user) {
                throw [{ msg: 'Email or password not valid!' }];
            }
            const isValidPass = await bcryptUtil.comparePassword(req.body.password, user.password);
            if (!isValidPass) {
                throw [{ msg: 'Email or password not valid!' }];
            }
            const token = jwtUtil.generateToken(user);
            res.cookie('authToken', token);
            res.redirect('/');
        } catch (errors) {
            console.log('errors: ', errors[0]);
            res.render('login', {
                errors, data: {
                    email: req.body.email,
                    password: req.body.password
                },
                active: 'login'
            });
        }
    });

router.get('/logout',
    isUser(), (req, res) => {
        res.clearCookie('authToken');
        res.redirect('/');
    });

router.get('/*', (req, res) => {
    res.render('404');
});

module.exports = router;
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const postsService = require('../services/postsService');
const jwtUtils = require('../util/jwtUtil');

router.get('/', async (req, res) => {
    const posts = await postsService.getAllPosts();
    res.render('all-posts', { posts });
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create',
    body('title').trim()
        .isLength({ min: 6 }).withMessage('Title must be at least 6 characters long.'),
    body('keyword').trim()
        .isLength({ min: 6 }).withMessage('Keyword must be at least 6 characters long.'),
    body('location').trim()
        .isLength({ max: 15 }).withMessage('Location cannot be more than 15 characters long.'),
    body('dateOfCreation').trim()
        .isLength({ min: 10, max: 10 }).withMessage('Date must be exactly 10 characters long.'),
    body('imageUrl').trim()
        .matches(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/)
        .withMessage('Image url must be a valid url.'),
    body('description').trim()
        .isLength({ min: 8 }).withMessage('The Description should be a minimum of 8 characters long'),
    async (req, res) => {
        try {
            const token = req.cookies['authToken'];
            const payload = jwtUtils.verifyToken(token);
            if (!payload) {
                res.redirect('/users/login');
            };
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const userId = payload.userId;
            await postsService.createPost(req.body, userId);
            res.redirect('/posts');
        } catch (errors) {
            console.log(errors);
            res.render('create', { errors, data: req.body })
        }
    });

router.get('/details/:id', async (req, res) => {
    const postId = req.params.id;
    const post = await postsService.getPostById(postId);
    res.render('details', { post });
});

router.get('/edit/:id', (req, res) => {
    res.render('edit');
});

router.get('/:userId', (req, res) => {
    res.render('my-posts');
});

router.get('/*', (req, res) => {
    res.render('404');
});

module.exports = router;
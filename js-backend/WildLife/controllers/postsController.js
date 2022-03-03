const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongoose').Types;
const postsService = require('../services/postsService');
const userService = require('../services/userService');
const jwtUtils = require('../util/jwtUtil');
const { isUser } = require('../util/tokenUtil');

router.get('/', async (req, res) => {
    const posts = await postsService.getAllPosts();
    res.render('all-posts', { posts });
});

router.get('/create', isUser(), (req, res) => {
    res.render('create');
});

router.post('/create',
    isUser(),
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
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            await postsService.createPost(req.body, res.locals.userId);
            res.redirect('/posts');
        } catch (errors) {
            console.log(errors);
            res.render('create', { errors, data: req.body })
        }
    });

router.get('/details/:id', isUser(), async (req, res) => {
    const postId = req.params.id;
    const post = await postsService.getPostById(postId);
    res.render('details', { post });
});

router.get('/delete/:id', isUser(), async (req, res) => {
    const post = await postsService.getPost(req.params.id);
    if (!post) {
        res.render('404');
        return;
    }
    if (post.author._id.toString() === res.locals.userId) {
        await postsService.deletePost(req.params.id);
        res.redirect('/posts');
        return;
    }
    res.redirect('/')
})

router.get('/edit/:id', isUser(), async (req, res) => {
    const post = await postsService.getPostById(req.params.id);
    if (!post) {
        res.render('404');
        return;
    }
    if (post.author._id.toString() === res.locals.userId) {
        res.render('edit', { post });
        return;
    }
    res.redirect('/');
});

router.post('/edit/:id', isUser(), isUser(),
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
        const post = await postsService.getPost(req.params.id);
        if (!post) {
            res.render('404');
            return;
        }
        if (post.author._id.toString() === res.locals.userId) {
            await postsService.updatePost(post, req.body);
            res.redirect(`/posts/details/${req.params.id}`);
            return;
        }
        res.redirect('/');
    });

router.get('/:userId', isUser(), (req, res) => {
    res.render('my-posts');
});

router.get('/:id/vote-up', isUser(), async (req, res) => {
    const postId = req.params.id;
    const userId = jwtUtils.verifyToken(req.cookies['authToken']).userId;
    const post = await postsService.getPost(postId);
    const user = await userService.findById(userId);
    if (!post || !user) {
        res.render('404');
        return;
    }
    post.votes.push(user._id);
    post.rating++;
    await post.save();
    res.redirect(`/posts/details/${postId}`);
});

router.get('/:id/vote-down', isUser(), async (req, res) => {
    const postId = req.params.id;
    const userId = jwtUtils.verifyToken(req.cookies['authToken']);
    const post = await postsService.getPost(postId);
    const user = await userService.findById(userId);
    if (!post || !user) {
        res.render('404');
    }
    post.votes.push(user._id);
    post.rating--;
    await post.save();
    res.redirect(`/posts/details/${postId}`);
});

router.get('/of/:id', isUser(), async (req, res) => {
    const posts = await postsService.getPostsByUser(req.params.id);
    res.render('my-posts', { posts });
});

router.get('/*', (req, res) => {
    res.render('404');
});

module.exports = router;
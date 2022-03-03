const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const adsService = require('../services/adsService');
const userService = require('../services/userService');
const jwtUtils = require('../util/jwtUtil');
const { isUser, isLoggedIn } = require('../util/tokenUtil');

router.get('/', async (req, res) => {
    const ads = await adsService.getAllAds();
    res.render('all-ads', { ads, active: 'all-ads' });
});

router.get('/create', isUser(), (req, res) => {
    res.render('create', { active: 'create'});
});

router.post('/create',
    isUser(),
    body('headline').trim()
        .isLength({ min: 4 }).withMessage('Headline must be at least 4 characters long.'),
    body('location').trim()
        .isLength({ min: 8 }).withMessage('Location must be at least 8 characters long.'),
    body('companyName').trim()
        .isLength({ min: 3 }).withMessage('Company name must be at least 3 characters long.'),
    body('companyDescription').trim()
        .notEmpty().withMessage('Company description is required.')
        .isLength({ max: 40 }).withMessage('Company description must be less than 40 characters long.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            await adsService.createAd(req.body, res.locals.userId);
            res.redirect('/ads');
        } catch (errors) {
            res.render('create', { errors, data: req.body })
        }
    });

router.get('/details/:id', isLoggedIn(), async (req, res) => {
    const ad = await adsService.getAdById(req.params.id);
    if (!ad) {
        res.render('404');
        return;
    }
    res.render('details', { ad });
});

router.get('/delete/:id', isUser(), async (req, res) => {
    const ad = await adsService.getAdWithoutLean(req.params.id);
    if (!ad) {
        res.render('404');
        return;
    }
    if (ad.author._id.toString() === res.locals.userId) {
        await adsService.deleteAd(req.params.id);
        res.redirect('/ads');
        return;
    }
    res.redirect('/')
})

router.get('/edit/:id', isUser(), async (req, res) => {
    const ad = await adsService.getAdById(req.params.id);
    if (!ad) {
        res.render('404');
        return;
    }
    if (ad.author._id.toString() === res.locals.userId) {
        res.render('edit', { ad });
        return;
    }
    res.redirect('/');
});

router.post('/edit/:id', isUser(),
    isUser(),
    body('headline').trim()
        .isLength({ min: 4 }).withMessage('Headline must be at least 4 characters long.'),
    body('location').trim()
        .isLength({ min: 8 }).withMessage('Location must be at least 8 characters long.'),
    body('companyName').trim()
        .isLength({ min: 3 }).withMessage('Company name must be at least 3 characters long.'),
    body('companyDescription').trim()
        .notEmpty().withMessage('Company description is required.')
        .isLength({ max: 40 }).withMessage('Company description must be less than 40 characters long.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const ad = await adsService.getAdWithoutLean(req.params.id);
            if (!ad) {
                res.render('404');
                return;
            }
            if (ad.author._id.toString() === res.locals.userId) {
                await adsService.updateAd(ad, req.body);
                res.redirect(`/ads/details/${req.params.id}`);
                return;
            }
            res.redirect('/');
        } catch (errors) {
            res.render('edit', { errors, ad: req.body })
        }
    });

router.get('/apply/:id', isUser(), async (req, res) => {
    const adId = req.params.id;
    const userId = jwtUtils.verifyToken(req.cookies['authToken']).userId;
    const ad = await adsService.getAdWithoutLean(adId);
    const user = await userService.findById(userId);
    if (!ad || !user) {
        res.render('404');
        return;
    }
    if (ad.author._id === userId) {
        res.redirect('/');
        return;
    }
    const isUserAlreadyApplied = ad.applications.some(c => c._id === userId.toString());
    if (isUserAlreadyApplied) {
        res.redirect('/');
        return;
    }
    ad.applications.push(user._id);
    await ad.save();
    res.redirect(`/ads/details/${adId}`);
});

router.get('/search', isUser(), (req, res) => {
    res.render('search', { active: 'search' });
});

router.post('/search', isUser(), async (req, res) => {
    const searchText = req.body.searchText;
    const ads = await adsService.search(searchText);
    res.render('search', { ads, active: 'search' });
});

router.get('/*', (req, res) => {
    res.render('404');
});

module.exports = router;
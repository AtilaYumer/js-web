const { Router } = require('express');
const adsService = require('../services/adsService');

const router = Router();

router.get('/', async (req, res) => {
    const ads = await adsService.getFirstThreeAds();
    res.render('home', { ads, active: 'home' });
});

module.exports = router;
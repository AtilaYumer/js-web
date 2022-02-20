const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const router = Router();

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create',
    body('name')
        .trim()
        .isLength({ min: 5 }).withMessage('Name must be at least 5 characters long.')
        .matches(/^[a-z0-9\s]+$/i).withMessage('Name must contain only alpha numeric and spaces'),
    body('description')
        .trim()
        .isLength({ min: 20 }).withMessage('Description must be at least 5 characters long.')
        .matches(/^[a-z0-9\s//.//']+$/im).withMessage('Description must contain only alpha numeric and spaces'),
    body('imageUrl')
        .trim()
        .notEmpty().withMessage('Image url is required.'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            await cubeService.createCube(req.body, res.locals.userId);
            res.redirect('/');
        } catch (errors) {
            if (errors.name === 'ValidationError') {
                errors = Object.values(errors.errors).map(error => Object.assign({}, { msg: error.message }));
            }
            res.render('create', { errors, cube: req.body });
        }
    });

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getCubeById(req.params.id);
    res.render('details', { cube: cube, isOwner: res.locals.userId == cube.creatorId });
});

router.post('/search', async (req, res) => {
    let cubes = await cubeService.search(req.body);
    if (cubes === -1) {
        res.redirect('/');
    }
    res.render('index', { cubes });
});

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await cubeService.getCubeById(req.params.id);
    const accessories = await accessoryService.getAccessoriesByCube(cube);
    res.render('attachAccessory', { cube, accessories });
});

router.post('/attach/accessory/:id', async (req, res) => {
    const cube = await cubeService.getCubeById(req.params.id);
    const accessory = await accessoryService.getAccessoryById(req.body.accessory);

    cube.accessories.push(accessory._id);
    accessory.cubes.push(cube._id);

    await cube.save();
    await accessory.save();
    console.log(`Accessory ${accessory.name} atacched to cube ${cube.name}`);
    res.redirect(`/cubes/attach/accessory/${req.params.id}`);
});

router.get('/edit/:id', async (req, res) => {
    const cube = await cubeService.getCubeById(req.params.id);
    res.render('editCubePage', { cube: cube });
});

router.post('/edit/:id',
    body('name')
        .trim()
        .isLength({ min: 5 }).withMessage('Name must be at least 5 characters long.')
        .matches(/^[a-z0-9\s]+$/i).withMessage('Name must contain only alpha numeric and spaces'),
    body('description')
        .trim()
        .isLength({ min: 20 }).withMessage('Description must be at least 5 characters long.')
        .matches(/^[a-z0-9\s//.//']+$/im).withMessage('Description must contain only alpha numeric and spaces'),
    body('imageUrl')
        .trim()
        .notEmpty().withMessage('Image url is required.'),
    async (req, res) => {
        await cubeService.updateCube(req.params.id, req.body);
        res.redirect('/');
    });

router.get('/delete/:id', async (req, res) => {
    const cube = await cubeService.getCubeById(req.params.id);
    res.render('deleteCubePage', { cube });
});

router.post('/delete/:id', async (req, res) => {
    await cubeService.deleteCubeId(req.params.id);
    res.redirect('/');
});

module.exports = router;
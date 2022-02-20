const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const accessoryService = require('../services/accessoryService');

const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create',
    body('name')
        .trim()
        .isLength({ min: 5 }).withMessage('Name must be at least 5 characters long.')
        .matches(/^[a-z0-9\s//']+$/i).withMessage('Name must contain only alpha numeric and spaces'),
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
            await accessoryService.createAccessory(req.body);
            res.redirect('/');
        } catch (errors) {
            if (errors.name === 'ValidationError') {
                errors = Object.values(errors.errors).map(error => Object.assign({}, { msg: error.message }));
            }
            res.render('createAccessory', { errors, accessory: req.body })
        }
    });

module.exports = router;
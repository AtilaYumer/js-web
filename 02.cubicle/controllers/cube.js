const fs = require('fs');
const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube')

module.exports = {
    renderCreate: (req, res) => {
        res.render('create');
    },

    createCub: async (req, res) => {
        const body = req.body;
        const cube = new Cube({
            name: body.name,
            description: body.description,
            imageUrl: body.imageUrl,
            difficultyLevel: Number(body.difficultyLevel),
            creatorId: res.locals.userId
        });
        await cube.save();
        console.log('The cube is successfully created: ' + cube);
        res.redirect('/');
    },

    renderDetails: async (req, res) => {
        let id = req.params.id;
        const cube = await Cube.findById(id).populate('accessories');
        res.render('details', { cube: cube, isOwner: res.locals.userId == cube.creatorId });
    },

    search: async (req, res) => {
        let body = req.body;
        let search = body.search;
        let from = Number(body.from);
        let to = Number(body.to);
        let searchedCubes;
        if (search && !from && !to) {
            searchedCubes = await Cube.find({ "name": new RegExp(search, "i") });
        } else if (!search && from && !to) {
            searchedCubes = await Cube.find({ "difficultyLevel": { $gte: from } });
        } else if (!search && !from && to) {
            searchedCubes = await Cube.find({ "difficultyLevel": { $lte: to } });
        } else if (search && from && !to) {
            searchedCubes = await Cube.find({
                $and: [
                    { "name": new RegExp(search, "i") },
                    { 'difficultyLevel': { $gte: from } }
                ]
            });
        } else if (search && !from && to) {
            searchedCubes = await Cube.find({
                $and: [
                    { "name": new RegExp(search, "i") },
                    { 'difficultyLevel': { $lte: to } }
                ]
            });
        } else if (!search && from && to) {
            searchedCubes = await Cube.find({
                $and: [
                    { 'difficultyLevel': { $lte: to } },
                    { 'difficultyLevel': { $gte: from } }
                ]
            });
        } else if (search && from && to) {
            searchedCubes = await Cube.find({
                $and: [
                    { "name": new RegExp(search, "i") },
                    { 'difficultyLevel': { $lte: to } },
                    { 'difficultyLevel': { $gte: from } }
                ]
            });
        } else {
            res.redirect('/');
            return;
        }
        res.render('index', { cubes: searchedCubes });
    },

    renderAttachAccessoryView: async (req, res) => {
        const id = req.params.id;
        const cube = await Cube.findById(id);
        const accessories = await Accessory.find({ cubes: { $nin: [cube] } });
        res.render('attachAccessory', { cube, accessories });
    },

    attachAccessory: async (req, res) => {
        const cubeId = req.params.id;
        const accesoryId = req.body.accessory;

        const cube = await Cube.findById(cubeId);
        const accessory = await Accessory.findById(accesoryId);

        cube.accessories.push(accessory._id);
        accessory.cubes.push(cube._id);

        await cube.save();
        await accessory.save();
        console.log(`Accessory ${accessory.name} atacched to cube ${cube.name}`);
        res.redirect(`/attach/accessory/${cubeId}`);
    },

    renderEdit: async (req, res) => {
        const cubeId = req.params.id;
        const cube = await Cube.findById(cubeId);
        cube.selectedOption = function (value) {
            return cube.difficultyLevel == value;
        }
        res.render('editCubePage', { cube: cube });
    },

    edit: async (req, res) => {
        const cubeId = req.params.id;
        const body = req.body;

        await Cube.findOneAndUpdate({ "_id": cubeId }, {
            $set: {
                "name": body.name,
                "description": body.description,
                "imageUrl": body.imageUrl,
                "difficultyLevel": body.difficultyLevel
            }
        });
        res.redirect('/');
    },

    renderDelete: async (req, res) => {
        const cubeId = req.params.id;
        const cube = await Cube.findById(cubeId);
        res.render('deleteCubePage', { cube: cube });
    },

    delete: async (req, res) => {
        await Cube.deleteOne({ "_id": req.params.id });
        res.redirect('/');
    }
}
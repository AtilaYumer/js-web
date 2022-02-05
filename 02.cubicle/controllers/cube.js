const fs = require('fs');
const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube')

let getAllCubes = () => {
    return new Promise((success, error) => {
        fs.readFile('./config/database.json', 'utf-8', (err, data) => {
            if (err) {
                error(err);
            } else {
                success(JSON.parse(data));
            }
        });
    })
}

module.exports = {
    renderCreate: (req, res) => {
        res.render('create');
    },

    createCub: async (req, res) => {
        let body = req.body
        const cube = new Cube({
            name: body.name,
            description: body.description,
            imageUrl: body.imageUrl,
            difficultyLevel: Number(body.difficultyLevel)
        });
        await cube.save();
        console.log('The cube is successfully created: ' + cube);
        res.redirect('/');
    },

    renderDetails: async (req, res) => {
        let id = req.params.id;
        const cube = await Cube.findById(id).populate('accessories');
        res.render('details', { cube: cube });
    },

    search: (req, res) => {
        let body = req.body;
        getAllCubes().then(cubes => {
            let search = body.search;
            let from = body.from;
            let to = body.to;
            let searchedCubes = [];
            if (search && !from && !to) {
                searchedCubes = cubes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
            } else if (!search && from && !to) {
                searchedCubes = cubes.filter(c => Number(c.difficultyLevel) >= Number(from));
            } else if (!search && !from && to) {
                searchedCubes = cubes.filter(c => Number(c.difficultyLevel) <= Number(to));
            } else if (search && from && !to) {
                searchedCubes = cubes.filter(c => {
                    return c.name.toLowerCase().includes(search.toLowerCase())
                        && Number(c.difficultyLevel) >= Number(from);
                });
            } else if (search && !from && to) {
                searchedCubes = cubes.filter(c => {
                    return c.name.toLowerCase().includes(search.toLowerCase())
                        && Number(c.difficultyLevel) <= Number(to);
                });
            } else if (!search && from && to) {
                searchedCubes = cubes.filter(c => {
                    return Number(c.difficultyLevel) >= Number(from)
                        && Number(c.difficultyLevel) <= Number(to);
                });
            } else {
                res.redirect('/');
                return;
            }
            res.render('index', { cubes: searchedCubes });
        }).catch(err => {
            console.log(err.message);
            throw err;
        })
    },

    renderAttachAccessoryView: async (req, res) => {
        const id = req.params.id;
        const cube = await Cube.findById(id);
        const accessories = await Accessory.find({cubes: {$nin: [cube]}});
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
    }
}
const fs = require('fs');
const { resolve } = require('path');
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

    createCub: (req, res) => {
        let body = req.body
        getAllCubes().then(cubes => {
            cubes.push(new Cube(Math.floor(Math.random() * 1000000), body.name, body.description, body.imageUrl, body.difficultyLevel));
            const json = JSON.stringify(cubes);
            fs.writeFile('./config/database.json', json, 'utf-8', () => {
                console.log("The cat is added successfully.");
            });
            res.redirect('/');
        }, err => {
            console.log(err.message);
            throw err;
        });
    },

    renderDetails: (req, res) => {
        let id = req.params.id;
        getAllCubes().then(cubes => {
            let cube = cubes.find(c => c.id == id);
            res.render('details', { cube: cube });
        }).catch(err => {
            console.log(err.message);
            throw err;
        });
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
    }
}
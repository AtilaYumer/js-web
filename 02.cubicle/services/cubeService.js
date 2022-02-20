const Cube = require('../models/Cube');

async function createCube(body, userId) {
    const cube = new Cube({
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        difficultyLevel: Number(body.difficultyLevel),
        creatorId: userId
    });
    await cube.save();
    console.log('The cube is successfully created: ' + cube);
}

async function getCubeById(id) {
    return await Cube.findById(id).populate('accessories');
}

async function search(body) {
    let search = body.search;
    let from = Number(body.from);
    let to = Number(body.to);

    if (search && !from && !to) {
        return await Cube.find({ "name": new RegExp(search, "i") });
    } else if (!search && from && !to) {
        return await Cube.find({ "difficultyLevel": { $gte: from } });
    } else if (!search && !from && to) {
        return await Cube.find({ "difficultyLevel": { $lte: to } });
    } else if (search && from && !to) {
        return await Cube.find({
            $and: [
                { "name": new RegExp(search, "i") },
                { 'difficultyLevel': { $gte: from } }
            ]
        });
    } else if (search && !from && to) {
        return await Cube.find({
            $and: [
                { "name": new RegExp(search, "i") },
                { 'difficultyLevel': { $lte: to } }
            ]
        });
    } else if (!search && from && to) {
        return await Cube.find({
            $and: [
                { 'difficultyLevel': { $lte: to } },
                { 'difficultyLevel': { $gte: from } }
            ]
        });
    } else if (search && from && to) {
        return await Cube.find({
            $and: [
                { "name": new RegExp(search, "i") },
                { 'difficultyLevel': { $lte: to } },
                { 'difficultyLevel': { $gte: from } }
            ]
        });
    } else {
        return -1;
    }
}

async function updateCube(id, body) {
    await Cube.findOneAndUpdate({ "_id": id }, {
        $set: {
            "name": body.name,
            "description": body.description,
            "imageUrl": body.imageUrl,
            "difficultyLevel": body.difficultyLevel
        }
    });
}

async function deleteCubeId(id) {
    await Cube.deleteOne({ "_id": id });
}

module.exports = {
    createCube,
    getCubeById,
    search,
    updateCube,
    deleteCubeId
}
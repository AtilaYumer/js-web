const Accessory = require('../models/Accessory');

async function getAccessoryById(id) {
    return await Accessory.findById(id);
}

async function getAccessoriesByCube(cube) {
    return await Accessory.find({ cubes: { $nin: [cube] } });
}

async function createAccessory(body) {
    const accessory = new Accessory({
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl
    });
    await accessory.save();
    console.log('Accessory successfuly created: ' + accessory);
}

module.exports = {
    getAccessoryById,
    getAccessoriesByCube,
    createAccessory
}
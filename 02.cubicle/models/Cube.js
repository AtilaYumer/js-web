const { Schema, model } = require('mongoose');

const cubeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [5, 'Name should be at least 5 characters long.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        minlength: [20, 'Description should be at least 20 characters long.'],
        maxlength: [255, 'Description should be less than 255 characters long.']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required.'],
        validate: {
            validator: function (v) {
                return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
            },
            message: 'Image url shoul be a real url.'
        }
    },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;
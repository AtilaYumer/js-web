const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required.'],
        validate: {
            validator: function (v) {
                return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
            },
            message: 'Image url should be a real url.'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        minlength: [20, 'Description should be more than 20 characters long.'],
        maxlength: [255, 'Description should be less than 255 characters long.']
    },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cubes' }]
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
const { Schema, model } = require('mongoose');

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 255 },
    imageUrl: {
        type: String, required: true, validate: {
            validator: function (v) {
                return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
            }
        }
    },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;
const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true },
    imageUrl: {
        type: String, required: true, validate: {
            validator: function (v) {
                return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
            }
        }
    },
    description: { type: String, required: true, maxLength: 255 },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cubes' }]
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
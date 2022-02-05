const Accessory = require("../models/Accessory");

module.exports = {
    render: (req, res) => {
        res.render('createAccessory');
    },
    create: async (req, res) => {
        const body = req.body;
        const accessory = new Accessory({
            name: body.name,
            description: body.description,
            imageUrl: body.imageUrl
        });
        await accessory.save();
        console.log('Accessory successfuly created: ' + accessory);
        res.redirect('/');
    }
}
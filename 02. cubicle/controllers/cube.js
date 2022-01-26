module.exports = {
    renderCreate: (req, res) => {
        res.render('create');
    },

    renderDetails: (req, res) => {
        console.log(req.params.id);
        res.render('details');
    }
}
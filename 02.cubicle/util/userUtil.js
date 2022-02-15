const bcrypt = require('bcrypt');

module.exports = {
    hashpassword: async function (plainPassword) {
        bcrypt.genSalt(9, (err, salt) => {
            bcrypt.hash(plainPassword, salt, (err, hash) => {
                this.password = hash;
            });
        });
    },

    comparePassword: async function (plainPassword, hashedPassword) {
        bcrypt.compare(plainPassword, hashedPassword, (err, res) => {
            if (err) {
                throw err;
            }
            return res;
        });
    }
}
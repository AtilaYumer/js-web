const bcrypt = require('bcrypt');

module.exports = {
    hashpassword: async function (plainPassword) {
        return bcrypt.hash(plainPassword, 10);
    },

    comparePassword: async function (plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
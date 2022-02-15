const jwt = require('jsonwebtoken');

const secretKey = 'cubicue';

function generate(user) {
    const payload = { _id: user._id, username: user.username};
    const options = { expiresIn: '2h'};
    return jwt.sign(payload, secretKey, options);
}

module.exports = {
    generate
}
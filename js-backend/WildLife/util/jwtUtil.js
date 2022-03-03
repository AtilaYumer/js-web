const jwt = require('jsonwebtoken');

const SECRET_KEY = 'wildlife';

function generateToken(user) {
    const payload = {
        userId: user._id,
        fistName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    const options = { expiresIn: '2h' }
    return jwt.sign(payload, SECRET_KEY, options);
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (e) {
        return undefined;
    }
}

module.exports = {
    generateToken,
    verifyToken
}
const jwt = require('jsonwebtoken');

function authenticateToken() {
    return function (req, res, next) {
        const token = req.cookies['authToken'];
        if (token) {
            try {
                const user = jwt.verify(token, 'cubicue');
                res.locals.userId = user._id;
                res.locals.username = user.username;
                res.locals.isLoggedInUser = true;
                next();
            } catch (error) {
                console.log(error);
                res.status(401).clearCookie('authToken').redirect('/');
            }
        } else {
            next();
        }
    };
}

module.exports = {
    authenticateToken
}
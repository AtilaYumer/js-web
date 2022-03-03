const jwtUtil = require('./jwtUtil');

function getToken(req) {
    return req.cookies['authToken'];
}

function isLoggedIn() {
    return (req, res, next) => {
        const payload = jwtUtil.verifyToken(getToken(req));
        if (payload) {
            res.locals.isUser = true;
            res.locals.userId = payload.userId;
            res.locals.email = payload.email;
        }
        next();
    }
}

function isUser() {
    return (req, res, next) => {
        const payload = jwtUtil.verifyToken(getToken(req));
        if (payload) {
            res.locals.isUser = true;
            res.locals.userId = payload.userId;
            res.locals.email = payload.email;
        } else {
            res.redirect('/users/login');
        }
        next();
    }
}

function isGuest() {
    return (req, res, next) => {
        const payload = jwtUtil.verifyToken(getToken(req));
        if (payload) {
            res.redirect('/');
        } else {
            next();
        }
    }
}

module.exports = {
    isUser,
    isGuest,
    isLoggedIn
}
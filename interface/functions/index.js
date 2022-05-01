const jwt = require('jsonwebtoken');

exports.verifyJWT = (jwtToken) => {
    return jwt.verify(jwtToken, process.env.JWT_SECRET);
}

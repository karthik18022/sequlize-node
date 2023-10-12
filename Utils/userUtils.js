const jwt = require('jsonwebtoken');

const secretKey = 'ben103';

const getUserId = (req, res) => {
    const headerAuth = req.headers["authorization"];
    const token  = headerAuth.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        res.userId= userId;
        console.log(decoded, 'decoded');
        return res;
    } catch (error) {
        // Handle token verification errors (e.g., token expired or invalid)
        console.error('Token verification error:', error.message);
    }
}


module.exports = { getUserId };

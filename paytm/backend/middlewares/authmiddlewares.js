require("dotenv").config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authorization = req.get("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization header missing or invalid"
        });
    }

    try {
        const token = authorization.slice(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
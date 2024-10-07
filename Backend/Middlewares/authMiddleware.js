require('dotenv').config();
const jwt = require('jsonwebtoken');


const generateToken = async (user) => {
    token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' },
    );
    return `${token}`;
};

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    if (token.startsWith("Bearer ")) {
        token = token.substring(7, token.length);
    } else {
        return res.status(400).json({ message: "Enter a valid token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
        req.user = decoded; // Set decoded data to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token.", error });
    }
};
module.exports = {
    generateToken,
    verifyToken
}
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // Verify token
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(data.id);
        if (!user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error); // ارمي الخطأ للـ errorHandler
    }
};

module.exports = { auth };
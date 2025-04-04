const User = require("../models/userModel");
const bcrypt = require("bcryptjs"); // غيرت من bcrypt لـ bcryptjs
const jwt = require("jsonwebtoken");

// get all User
const getUsers = async (req, res, next) => {
    try {
        const allUser = await User.find();
        if (!allUser) {
            res.status(404).json({ message: "theres no Users to show" });
        }
        return res.status(201).json({ message: "get All Users", data: allUser });
    } catch (error) {
        next(error);
    }
};

// create User 
const createUser = async (req, res, next) => {
    try {
        const { password, ...rest } = req.body;

        // hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            ...rest,
            password: hashedPassword,
        });

        if (!user) {
            res.status(400);
            throw new Error("there was a problem creating");
        }
        const { password: userPassword, ...otherDetails } = user._doc;
        return res.status(201).json(otherDetails);
    } catch (error) {
        next(error);
    }
};

// loginUser
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) { // افترضت matchPassword
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
  
      // ضيف الـ Token في الـ Cookies
      res.cookie("jwt", token, {
        httpOnly: true, // يمنع الوصول للـ Cookie من الـ JavaScript
        secure: process.env.NODE_ENV === "production", // Secure في الـ Production
        sameSite: "None", // لازم تكون None عشان يشتغل بين دومينات مختلفة
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 يوم
      });
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token, // رجع الـ Token للـ Frontend لو عايز تخزنه في LocalStorage
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  };

const logouteUser = async (req, res, next) => {
    res.cookie("jwt", "", { expiresIn: "-1" });
    return res.json({ message: "you have been logged out" });
};

module.exports = {
    getUsers,
    loginUser,
    createUser,
    logouteUser,
};
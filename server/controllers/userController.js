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
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400);
            throw new Error("your email doesnt exist");
        }

        // compare password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(400);
            throw new Error("incorrect password or username");
        }

        // generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("jwt", token);
        const { password: userPassword, ...rest } = user._doc;

        return res.status(200).json({
            message: "logged successfully",
            data: { ...rest },
        });
    } catch (error) {
        next(error);
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
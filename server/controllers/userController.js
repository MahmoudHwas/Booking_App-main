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



const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // ضيف الـ Cookie
    res.cookie("jwt", token, {
      httpOnly: true, // يمنع الوصول من الـ JavaScript
      secure: true, // لازم يكون true في الـ Production عشان HTTPS
      sameSite: "None", // عشان يشتغل بين دومينات مختلفة
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 يوم
    });

    console.log("Setting JWT Cookie:", token); // Log عشان التأكد

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token, // رجع الـ Token للـ Frontend
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
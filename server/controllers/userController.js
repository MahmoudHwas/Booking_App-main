const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// get all User
const getUsers = async (req, res, next) => {
        try {
            const allUser = await User.find();
                if(!allUser) {
                    res.status(404).json({message: "theres no Users to show"})
                }
                return res.status(201).json({message : " get All Users", data: allUser})
        } catch(error) {
             next(error)
               
        }
   
};
// get single User


const getSingleUser = async (req, res, next) => {
    try {
        const userId = await User.findById(req.params.id);
            if(!userId) {
                res.status(404).json({message: "this user not found"})
            }
            return res.status(201).json({message : " get All user", data: userId})
    } catch(error) {
        next(error)
           
    }

};

// create User 
const createUser = async (req, res, next) => {
    try{
        const {password, ...rest} = req.body;

        // hashed password
        const salt = await bcrypt.genSalt(10)
         hashedPassword = await bcrypt.hash(password , salt)

         
        const user = await User.create({
            ...rest,
            password: hashedPassword
        });


        
        if(!user) {
            res.status(400);
            throw new Error("there was a problem creating")
        }
        const {password: userPassword, ...otherDetails} = user._doc
        return res.status(201).json(otherDetails);
    }catch( error ) {
        next(error)
    }
    
}
// loginUser
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user) {
            res.status(400);
            throw new Error("your email dosent exist")
        }
        // compare password
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword) {
            res.status(400);
            throw new Error("inncorrect password or username")
        }
        // generate token sety
        //set cokies
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie("jwt", token)
        const {password: userPassword, ...rest} = user._doc
       
        
        return res.status(200).json({message: "loged successfully", data: {
            ...rest,
            
        }});
    } catch(error) {
        next(error)
           
    }

};

// update User 
const updateUser= async (req, res, next) => {
    try {
        const updatedUser= await User.findByIdAndUpdate(req.params.id, {$set: req.body },{new: true});
            if(!updatedUser) {
                res.status(404).json({message: "Can not update this User"})
            }
            return res.status(201).json({message : " User updated", data: updatedUser})
    } catch(error) {
        next(error)
           
    }

};


// delete User

const deleteUser= async (req, res) => {

    try{
        const deletUser= await User.findByIdAndDelete(req.params.id);

        if(!deletUser) {
             res.status(404).json({message : "course not found"})
        }
        return res.status(200).json({id: deletUser ,message : "course Deleted"})
    }catch (error) {
        next(error)
    }
}
const logouteUser = async (req, res, next) => {
    res.cookie("jwt", "", {expiresIn: "-1"});
    return res.json({message: "you have beed logged out"})
} 
module.exports = {
    getUsers,
    // getSingleUser,
    loginUser,
    createUser,
    // updateUser,
    // deleteUser,
    logouteUser
}
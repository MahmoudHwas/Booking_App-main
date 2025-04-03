const {Router} = require("express");
const { getUsers, createUser, loginUser, logouteUser } = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleWare");

const router = Router();


// get All users
router.get("/", auth, getUsers);

// router.get("/:id", getSingleUser);

// create User
router.post("/", createUser);


// login User
router.post("/login", loginUser);

// logout user 
router.get("/logout", logouteUser);

// update User
// router.put("/:id", updateUser);
//delete User 
// router.delete("/:id", deleteUser);



module.exports = router



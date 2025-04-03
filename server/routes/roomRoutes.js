const {Router} = require("express");
const {getRooms, createRoom, getSingleRoom, updateRoom, deleteRoom} = require("../controllers/roomController");
const { auth } = require("../middleware/authMiddleWare");

const router = Router();

// get All rooms
router.get("/", getRooms, getSingleRoom);

router.get("/:id", getSingleRoom);

// create Room
router.post("/" , auth, createRoom);

// update route
router.put("/:id",auth, updateRoom);
//delete room 
router.delete("/:id",auth, deleteRoom);
module.exports = router



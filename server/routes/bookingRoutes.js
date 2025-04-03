const {Router} = require("express");
const { getBookings, createBookings, singleBooings, updateBooings, deleteBookings } = require("../controllers/bookingsController");
const { auth } = require("../middleware/authMiddleWare");

const router = Router();

// get All Booking
router.get("/", auth ,getBookings);

// create Booking
router.post("/", createBookings);

// get singleBooikng 
router.get("/:id",auth, singleBooings);

// update Bookings
router.put("/:id",auth, updateBooings);
// update Bookings
router.delete("/:id",auth, deleteBookings);
module.exports = router
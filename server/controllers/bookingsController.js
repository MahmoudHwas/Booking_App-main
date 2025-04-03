const Bookings = require("../models/bookingModel")



// get all Bookings
const getBookings = async (req, res, next) => {
        try {
            const allBookings = await Bookings.find().populate("roomId");
                if(!allBookings) {
                    res.status(404).json({message: "theres no rooms to show"})
                }
                return res.status(201).json(allBookings)
        } catch(error) {
             next(error)
               
        }
   
};

// create Bookings
const createBookings = async (req, res, next) => {
    try {
        const createBookings = await Bookings.create(req.body);
            if(!createBookings) {
                res.status(404).json({message: "theres no rooms to show"})
            }
            return res.status(201).json({message : " Booking created successfully", data: createBookings})
    } catch(error) {
         next(error)
           
    }
};


// get single Booking
const singleBooings = async (req, res, next) => {
    try{
     
        const booking = await Bookings.findById(req.params.id).populate("roomId")
        if(!booking) {
            res.status(404).json({message: "theres no Booking to show"}) 
        }

            return res.status(201).json(booking)
    } catch(error) {
        next(error)
    } 
}


// update Booknigs 
const updateBooings = async (req, res, next) => {
    try{
     
        const update = await Bookings.findByIdAndUpdate(req.params.id, {$set:req.body}, {
            new: true
        })
        if(!update) {
            res.status(404).json({message: "somthing went wrong"}) 
        }

            return res.status(201).json({message : "your course updated", data: update})
    } catch(error) {
        next(error)
    } 
}

// delete Bookings

const deleteBookings = async (req, res) => {

    try{
        const deletBooking = await Bookings.findByIdAndDelete(req.params.id);

        if(!deletBooking) {
             res.status(404).json({message : "Booknig not found"})
        }
        return res.status(200).json({id: deletBooking, message: "Booking  Deleted"})
    }catch (error) {
        next(error)
    }
}
module.exports = {
    getBookings,
    createBookings,
    singleBooings,
    updateBooings,
    deleteBookings
}
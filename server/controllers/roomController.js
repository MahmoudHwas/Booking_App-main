const Room = require("../models/roomModel")

// get all rooms
const getRooms = async (req, res, next) => {
        try {
            const allRooms = await Room.find();
                if(!allRooms) {
                    res.status(404).json({message: "theres no rooms to show"})
                }
                return res.status(201).json(allRooms)
        } catch(error) {
             next(error)
               
        }
   
};
// get single room


const getSingleRoom = async (req, res, next) => {
    try {
        const roomId = await Room.findById(req.params.id);
            if(!roomId) {
                res.status(404).json({message: "this room not found"})
            }
            return res.status(201).json(roomId)
    } catch(error) {
        next(error)
           
    }

};

// create room 
const createRoom = async (req, res, next) => {
    try{
        const room = await Room.create(req.body);
        if(!room) {
            res.status(400);
            throw new Error("there was a problem creating")
        }
        const rooms = await Room.find();
        return res.status(201).json(rooms);
    }catch( error ) {
        next(error)
    }
    
}


// update room 
const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body },{new: true});
            if(!updatedRoom) {
                res.status(404).json({message: "Can not update this room"})
            }
            return res.status(200).json(updatedRoom)
    } catch(error) {
        next(error)
           
    }

};


// deleteRoom 

const deleteRoom = async (req, res) => {

    try{
        const deletOne = await Room.findByIdAndDelete(req.params.id);

        if(!deletOne) {
             res.status(404).json({message : "course not found"})
        }
        return res.status(200).json({id: deletOne})
    }catch (error) {
        next(error)
    }
}
module.exports = {
    getRooms,
    createRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}
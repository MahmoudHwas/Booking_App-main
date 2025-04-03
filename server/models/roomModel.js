const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc : {
        type: String,
        required: true
    },
      img: {
    type: [String],
  },
    roomNumbers: {
        type: [
        {
            number: Number,
            unavilabelDates: [Date],
        },
        ],
    },
})

module.exports = mongoose.model("Room", roomSchema)
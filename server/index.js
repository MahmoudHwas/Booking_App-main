const dotenv = require('dotenv').config;
const express = require("express");
const connecteDB = require("./config/db.js")
const app = express();
const roomRoutes = require("./routes/roomRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js")
const usersRoutes = require("./routes/userRoutes.js")
const { errorHandler } = require('./middleware/errorHandler.js');
const cookieParser = require("cookie-parser");
const { auth } = require('./middleware/authMiddleWare.js');
dotenv()
// setup middleware
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 5000
// connect to database
connecteDB()
app.get("/", (req , res) => {

    res.send("hello")
})
// middleware handler
app.use(errorHandler)


// setup routes0
app.use("/api/rooms", roomRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/users", usersRoutes)
app.use("/auth", auth)

// setup production
if(process.env.NODE_ENV === "production") {
    console.log("we are in production");
    
}
app.listen(PORT, ()=> {
    console.log(`server work on port ${PORT}`);
    
})

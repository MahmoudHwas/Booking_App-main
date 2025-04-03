const dotenv = require("dotenv").config(); // تصحيح dotenv
const express = require("express");
const cors = require("cors");
const connecteDB = require("./config/db.js");
const app = express();
const roomRoutes = require("./routes/roomRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const usersRoutes = require("./routes/userRoutes.js");
const { errorHandler } = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/authMiddleware.js");

const PORT = process.env.PORT || 5000;

// Setup middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // يسمح لأي دومين بإرسال الطلبات

// Connect to database and start server
const startServer = async () => {
    try {
        await connecteDB(); // استني الاتصال بـ MongoDB
        console.log("Database connected, starting server...");

        // Routes
        app.get("/", (req, res) => {
            res.send("hello");
        });

        app.use("/api/rooms", roomRoutes);
        app.use("/api/bookings", bookingRoutes);
        app.use("/api/users", usersRoutes);
        app.use("/auth", auth);

        // Error handler (ييجي بعد كل الـ routes)
        app.use(errorHandler);

        // Start server
        app.listen(PORT, () => {
            console.log(`Server work on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

// Setup production
if (process.env.NODE_ENV === "production") {
    console.log("We are in production");
}
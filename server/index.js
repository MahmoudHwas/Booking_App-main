const dotenv = require("dotenv").config();
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

// Setup CORS لقبول أي Origin مع Credentials
app.use(cors({
  origin: (origin, callback) => {
    // سمح بأي Origin أو لو مفيش Origin (زي Postman)
    callback(null, origin || "*");
  },
  credentials: true, // يسمح بالـ Cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// للتأكد من الـ Origin
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connecteDB();
    console.log("Database connected, starting server...");

    // Routes
    app.get("/", (req, res) => {
      res.send("hello");
    });

    app.use("/api/rooms", roomRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/auth", auth);

    // Error handler
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

if (process.env.NODE_ENV === "production") {
  console.log("We are in production");
}
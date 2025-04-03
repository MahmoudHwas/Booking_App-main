const mongoose = require("mongoose");

const connecteDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to database ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error; // ارمي الخطأ للـ caller عشان يتعامل معاه
    }
};

module.exports = connecteDB;
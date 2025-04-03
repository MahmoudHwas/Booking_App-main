const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    console.error(`Error: ${error.message}, Stack: ${error.stack}`); // سجل الخطأ في الـ logs
    return res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack, // أظهر الـ stack في الـ dev بس
    });
};

module.exports = { errorHandler };
const errorMessage = (error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'cake' : error.stack,
    })
}

module.exports = {
    errorMessage
};

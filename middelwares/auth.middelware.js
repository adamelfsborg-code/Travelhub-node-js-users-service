const { findUser } = require('../schemas/yup.auth.js')
const { errorMessage } = require('./error.middelware.js')

const validateFindUser = async (req, res, next) => {
    const { id } = req.query;
    const userSchema = findUser()

    try {
        const isValid = await userSchema.validate({ id })
        return next()
    } catch (error) {
        errorMessage(error, req, res, next)
    }
}

const validateCreateUser = (req, res, next) => {
    console.log(req.body)
    const { username, password } = req.body;
    if ((!username || username.length <= 10) || (!password || password.length <= 10)) {
        return res.status(400).json({ msg: 'User id must be passed' })
    }

    return next()
}

const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = {
    validateFindUser,
    validateCreateUser
};

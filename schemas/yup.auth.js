const yup = require('yup');

const findUser = () => {
    const schema = yup.object().shape({
        id: yup.number().required().positive().integer(),
    })
    return schema
}

module.exports = {
    findUser
};

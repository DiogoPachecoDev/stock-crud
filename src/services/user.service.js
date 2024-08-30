require('dotenv').config();

const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

const getAll = async function() {
    const userList = await userRepository.getAll();
    return userList;
}

const getById = async function(id) {
    const userData = await userRepository.getById(id);
    return userData;
}

const create = async function(user) {
    user.password = await bcrypt.hash(user.password, ~~process.env.SALT);
    const userCreated = await userRepository.create(user);
    return userCreated;
}

module.exports = {
    getAll,
    getById,
    create
}

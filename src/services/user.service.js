const userRepository = require('../repositories/user.repository');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const getAll = async function() {
    const userList = await userRepository.getAll();
    return userList;
}

const getById = async function(id) {
    const userData = await userRepository.getById(id);

    if(!userData) {
        return createError(404, 'User not found');
    }

    return userData;
}

const create = async function(user) {
    const duplicateUser = await userRepository.getByFilter({ email: user.email });

    if(duplicateUser) {
        return createError(409, 'There is already a user with this email')
    }

    user.password = await bcrypt.hash(user.password, ~~process.env.SALT);
    const userCreated = await userRepository.create(user);

    return userCreated;
}

const update = async function(user, id) {
    const existsUser = await userRepository.getById(id);

    if(!existsUser) {
        return createError(404, 'User not found');
    }

    await userRepository.update(user, id);
    const userUpdated = await userRepository.getById(id);

    return userUpdated;
}

const destroy = async function(id) {
    const existsUser = await userRepository.getById(id);

    if(!existsUser) {
        return createError(404, 'User not found');
    }

    await userRepository.destroy(id);

    return existsUser;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy
}

const { where } = require('sequelize');
const db = require('../database/models/index');
const { User } = require('../database/models/index');

const getAll = async function() {
    const usersList = await User.findAll();
    return usersList;
}

const getById = async function(id) {
    const userData = await User.findByPk(id);
    return userData;
}

const getByFilter = async function(filter) {
    const userData = await User.findOne({ where: filter });
    return userData;
}

const create = async function(user) {
    const userCreated = await User.create(user);
    return userCreated;
}

module.exports = {
    getAll,
    getById,
    getByFilter,
    create
}

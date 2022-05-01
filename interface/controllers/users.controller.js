const { users } = require("../models");
const db = require("../models");
const citizens = db.citizens;
const op = db.Sequelize.Op;

// Create a new user
exports.create = (username, password) => {
    return users.create({ username, password });
}

// Get a user by their username
exports.findByUsername = (username) => {
    return users.findOne({
        where: {
            username: username
        }
    });
}

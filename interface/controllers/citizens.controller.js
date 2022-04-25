const db = require("../models");
const citizens = db.citizens;
const op = db.Sequelize.Op;

// Retrieve all citizens from the database. Limit the number of citizens returned to 10.
exports.findXCitizens = () => {
    const limit = 10;
    return citizens.findAll({
        limit: limit
    });
}

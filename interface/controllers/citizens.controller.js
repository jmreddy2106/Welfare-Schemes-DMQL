const db = require("../models");
const citizens = db.citizens;
const op = db.Sequelize.Op;

// Retrieve all citizens from the database. Limit the number of citizens returned to 10.
exports.findXCitizens = (req, res) => {
    const limit = 10;
    citizens.findAll({
        limit: limit
    }).then(citizens => {
        res.send(citizens);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving citizens."
        });
    });
}

const db = require("../models");
const state = db.state_master;

// function to get all states
exports.allStates = () => {
    const query = "SELECT * FROM state_master";
    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });    
};

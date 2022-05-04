const db = require("../models");
const village = db.village_master;


exports.allVillages = () => {
    return village.findAll({
        attributes: ['village_id', 'village_name']
    })
};


exports.allVillagesByMandalId = (mandal_id) => {
    const query =`SELECT * FROM village_master WHERE mandal_id = ${mandal_id}`;
    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT }).then(villages => {
        if (villages) {
            return villages;
        }
        return null;
    });
};

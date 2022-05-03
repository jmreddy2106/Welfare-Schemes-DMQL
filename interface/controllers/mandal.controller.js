const db = require("../models");
const mandal = db.mandal_master;


exports.allMandals = () => {
    return mandal.findAll({
        attributes: ['mandal_id', 'mandal_name']
    })
};


exports.allMandalsByDistrictId = (district_id) => {
    const query =`SELECT * FROM mandal_master WHERE district_id = ${district_id}`;
    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    
};

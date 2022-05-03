const db = require("../models");
const district = db.district_master;

exports.allDistricts = () => {
    return district.findAll({
        attributes: ['district_id', 'district_name']
    })
};


exports.allDistrictsByStateId = (state_id) => {
    const query =`SELECT * FROM district_master WHERE state_id = ${state_id}`;
    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
};






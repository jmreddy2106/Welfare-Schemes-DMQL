const db = require("../models");
const citizens = db.citizens;
const {QueryTypes} = require('sequelize');
const { sequelize } = require("../models");


// Retrieve all citizens from the database. Limit the number of citizens returned to 10.
exports.findXCitizens = () => {
  query = `select c.citizen_id, c.first_name, c.last_name, c.address, c.mobile_num, c.dob, c.gender, c.marital_status, c.village_id, v.village_name  
            from citizens c
            join village_master v
            on c.village_id = v.village_id
            order by citizen_id limit 10;`;

  return sequelize.query(query, { type: QueryTypes.SELECT })
};

exports.editCitizen = (citizen_id, address, mobile_num, dob, marital_status) => {
  return citizens.update({
    address, mobile_num, dob, marital_status
  }, {
    where: {
      citizen_id
    }
  });
};

// Get total number of male and female citizens
exports.findGenderDistribution = () => {
  // group by the 'gender' column

  /**
   * This code is equivalent to the following SQL query:
   * select count(gender), gender from citizens group by gender ;
   */

  return citizens.findAll({
    group: ["gender"],
    attributes: ["gender", [db.sequelize.fn("COUNT", "gender"), "genderCount"]],
    raw: true
  });
};

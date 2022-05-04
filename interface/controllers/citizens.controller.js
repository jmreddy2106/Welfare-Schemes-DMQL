const db = require("../models");
const citizens = db.citizens;
const {QueryTypes} = require('sequelize');
const { sequelize } = require("../models");


// Retrieve all citizens from the database. Limit the number of citizens returned to 10.
exports.findXCitizens = (limit, offset) => {
  const query = `select c.citizen_id, c.first_name, c.last_name, c.address, c.mobile_num, c.dob, c.gender, c.marital_status, c.village_id, v.village_name  
            from citizens c
            join village_master v
            on c.village_id = v.village_id
            order by citizen_id limit ${limit} offset ${offset};`;

  return sequelize.query(query, { type: QueryTypes.SELECT })
};

exports.getCountOfCitizens = () => {
  const query = `select count(*) as count from citizens;`;
  return sequelize.query(query, { type: QueryTypes.SELECT })
}


exports.deleteCitizenbyId = (citizen_id) =>{
  return citizens.destroy({
    where: { citizen_id }
  })
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

//Check Citizen exists or not
exports.checkCitizenId = (citizen_id) => {
  return citizens.findOne({
    where: {
      citizen_id
    }
  }).then(
    citizen_id => {
      if (citizen_id) {
        return true;
      }
      return false;
    }
  )
}


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


// add new citizen
exports.addNewCitizen = (citizen_id, first_name, last_name, address, mobile_num, dob, gender, marital_status, disabled, disbaled_percentage, caste, village_id) => {
  return citizens.create({
    citizen_id, first_name, last_name, address, mobile_num, dob, gender, marital_status, disabled, disbaled_percentage, caste, village_id
  });
};
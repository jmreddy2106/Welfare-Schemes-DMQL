const db = require("../models");
const citizens = db.citizens;

// Retrieve all citizens from the database. Limit the number of citizens returned to 10.
exports.findXCitizens = () => {
  const limit = 10;
  return citizens.findAll({
    limit: limit,
  });
};

// Get total number of male and female citizens
exports.findGenderDistribution = () => {
  // group by the 'gender' column

  /**
   * This code is equivalent to the following SQL query:
   * select count(gender), gender from citizens group by gender;
   */

  return citizens.findAll({
    group: ["gender"],
    attributes: ["gender", [db.sequelize.fn("COUNT", "gender"), "genderCount"]],
    raw: true
  });
};

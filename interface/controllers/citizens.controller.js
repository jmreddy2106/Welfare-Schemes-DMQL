const db = require("../models");
const citizens = db.citizens;
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

// Retrieve all citizens from the database. Limit the number of citizens returned to 10.
exports.findXCitizens = (limit, offset) => {
  const query = `select c.citizen_id, c.first_name, c.last_name, c.address, c.mobile_num, c.dob, c.gender, c.marital_status, c.village_id, v.village_name  
            from citizens c
            join village_master v
            on c.village_id = v.village_id
            order by citizen_id limit ${limit} offset ${offset};`;

  return sequelize.query(query, { type: QueryTypes.SELECT });
};

exports.getBeneficiaries = (limit, offset) => {
  const query = `select distinct c.citizen_id,c.first_name , c.last_name ,c.gender ,cs.job_type ,
  case when pm.schem_name is not null then 'Benifitted with Pension ' else 'Na' end as pension_schem, 
  coalesce (sum (pt.pen_amount),0) as pension_amount_benifetted ,
  case when em.citizen_id is not null then 'Offered Education schem' else 'NA' end as education_schem ,
  coalesce (sum(em.amount) ,0) as education_amount_benifetted,
  case when at2.crop_seaon  is not null then 'Benifitted with agriculture schem' else 'Na' end as agri_schem,
  coalesce (sum(at2.amt_remitted) ,0) as agri_amount_benifetted,
  case when lt.citizen_id  is not null then 'Benifitted with LPG ' else 'Na' end as lpg_schem,
  case when nm.nregs_id is not null then 'Benifitted with Nregs' else 'Na' end as Nregs_schem,
  coalesce (sum(nt.amount_remitted) ,0) as nregs_amount_benifetted,
  case when ht.citizen_id  is not  null then 'Benifitted with health schem' else 'Na' end as Health_schem,
  coalesce (sum(ht.amount_charged), 0) as health_amount_benifitted,
  coalesce (sum (pt.pen_amount),0)+coalesce (sum(em.amount) ,0)+
  coalesce (sum(at2.amt_remitted) ,0)+coalesce (sum(lt.amount_remitted) ,0)+ coalesce (sum(ht.amount_charged), 0) as total_amount_benifitted
  from citizens c 
  left join civil_supplies cs ON (c.citizen_id = cs.citizen_id)
  left join pension_transaction pt on (cs.citizen_id = pt.citizen_id)
  left join pension_master pm  on (pt.pension_schem_id = pm.pension_schem_id)
  left join education_master em on (em.citizen_id = cs.citizen_id )
  left join agri_trasaction at2 on (at2.citizen_id=cs.citizen_id)
  left join lpg_transaction lt on (lt.citizen_id= c.citizen_id)
  left join nregs_master nm on (nm.citizen_id = cs.citizen_id)
  left join nregs_transaction nt on (nm.nregs_id=nt.nregs_id)
  left join hospital_transaction ht on (cs.citizen_id = ht.citizen_id)
  group by c.citizen_id,c.first_name , c.last_name ,c.gender 
  ,cs.job_type ,pension_schem,education_schem,agri_schem, lpg_schem,Nregs_schem,Health_schem limit ${limit} offset ${offset};`;

  return sequelize.query(query, { type: QueryTypes.SELECT });
};

exports.getCountOfCitizens = () => {
  const query = `select count(*) as count from citizens;`;
  return sequelize.query(query, { type: QueryTypes.SELECT });
};

exports.deleteCitizenbyId = (citizen_id) => {
  const query = `delete from citizens where citizen_id = ${citizen_id};`;
  return sequelize.query(query, { type: QueryTypes.DELETE });
};

exports.editCitizen = (
  citizen_id,
  address,
  mobile_num,
  dob,
  marital_status
) => {
  const query = `update citizens set address = '${address}', mobile_num = '${mobile_num}', dob = '${dob}', marital_status = '${marital_status}' where citizen_id = ${citizen_id};`;
  return sequelize.query(query, { type: QueryTypes.UPDATE });
};

//Check Citizen exists or not
exports.checkCitizenId = (citizen_id) => {
  const query = `select * from citizens where citizen_id = ${citizen_id};`;
  return sequelize
    .query(query, { type: QueryTypes.SELECT })
    .then((citizen_id) => {
      if (citizen_id) {
        return true;
      }
      return false;
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
    raw: true,
  });
};

// add new citizen
exports.addNewCitizen = (
  citizen_id,
  first_name,
  last_name,
  address,
  mobile_num,
  dob,
  gender,
  marital_status,
  disabled,
  disbaled_percentage,
  caste,
  village_id
) => {
  return citizens.create({
    citizen_id,
    first_name,
    last_name,
    address,
    mobile_num,
    dob,
    gender,
    marital_status,
    disabled,
    disbaled_percentage,
    caste,
    village_id,
  });
};

exports.searchCitizens = (query, limit, offset) => {
  const searchQuery = `SELECT * FROM citizens JOIN village_master on 
  citizens.village_id = village_master.village_id
  WHERE  to_tsvector(f_concat_ws(' ', first_name, last_name))
      @@ plainto_tsquery('${query}') limit ${limit} offset ${offset};`;
  return sequelize.query(searchQuery, { type: QueryTypes.SELECT });
}

exports.countSearchedCitizens = (query) => {
  const searchQuery = `SELECT count(*) FROM citizens JOIN village_master 
  on citizens.village_id = village_master.village_id
  WHERE  to_tsvector(f_concat_ws(' ', first_name, last_name))
      @@ plainto_tsquery('${query}');`;
  return sequelize.query(searchQuery, { type: QueryTypes.SELECT });
}

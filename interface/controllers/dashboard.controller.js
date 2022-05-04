const db = require("../models");


// Gender distribution

exports.genderDist = () => {
    const query = `select gender, count(gender) As gender_dist
                    from citizens
                    group by gender`
    
    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
}

// Caste
exports.casteDist = () => {
    const query = `select caste, count(caste) as caste_dist from citizens 
                    group by caste`

    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
}

// Marital Status
exports.maritalDist = () => {
    const query = `select marital_status, count(marital_status) as marital_dist from citizens 
                    group by marital_status`

    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
}

// Age Distribution
exports.ageDist = () => {
    const query = `select Age_Dist, sum(Age_count) from (
        select *, case when age < 3  then 'Infants' 
                    when (age > 3 AND age < 13) then 'Children'
                    when (age > 13 AND age < 18) then 'Teenagers'
                    when (age > 18 AND age < 25) then 'Young Adults'
                    when (age > 25 AND age < 60) then 'Adults'
                    else 'Seniors'
                    end as Age_Dist
        from (
        select Age, count(Age) as Age_count from (
        select date_part('year',age(dob)) as Age from citizens
            ) A
            group by Age
            ) B
            ) cc
            group by Age_Dist`

    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
}

// citizens by District
exports.citizensByDistrict = () => {
    const query = `select dm.district_name, count(dm.district_id) as district_dist from citizens cs
                    join village_master vm
                    on cs.village_id = vm.village_id
                    join mandal_master mm
                    on mm.mandal_id = vm.mandal_id
                    join district_master dm
                    on dm.district_id  = mm.district_id
                    group by dm.district_id`

    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
}

// Disable percentage
exports.disablePercentage = () => {
    const query = `select disbaled_percentage, count(disbaled_percentage) as disable_count_perc_dist 
                    from citizens
                    group by disbaled_percentage
                    order by disbaled_percentage;`

    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
}


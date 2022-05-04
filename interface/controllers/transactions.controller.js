const {QueryTypes} = require('sequelize');
const { sequelize } = require("../models");

const getAgricultureTransactions = (limit, offset) => {
    const query = `SELECT * FROM getAggricultureDetails() limit ${limit} offset ${offset};`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getAgricultureTransactionsCount = () => {
    const query = `SELECT count(*) as count FROM getAggricultureDetails();`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getHospitalTransactions = (limit, offset) => {
    const query = `SELECT * FROM getHospitalDetails() limit ${limit} offset ${offset};`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getHospitalTransactionsCount = () => {
    const query = `SELECT count(*) as count FROM getHospitalDetails();`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getLPGTransactions = (limit, offset) => {
    const query = `SELECT * FROM getLPGDetails() limit ${limit} offset ${offset};`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getLPGTransactionsCount = () => {
    const query = `SELECT count(*) as count FROM getLPGDetails();`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getNREGSTransactions = (limit, offset) => {
    const query = `SELECT * FROM getNREGSDetails() limit ${limit} offset ${offset};`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getNREGSTransactionsCount = () => {
    const query = `SELECT count(*) as count FROM getNREGSDetails();`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getPensionTransactions = (limit, offset) => {
    const query = `SELECT * FROM getPensionDetails() limit ${limit} offset ${offset};`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

const getPensionTransactionsCount = () => {
    const query = `SELECT count(*) as count FROM getPensionDetails();`;
    return sequelize.query(query, { type: QueryTypes.SELECT })
}

module.exports = {
    getAgricultureTransactions,
    getAgricultureTransactionsCount,
    getHospitalTransactions,
    getHospitalTransactionsCount,
    getLPGTransactions,
    getLPGTransactionsCount,
    getNREGSTransactions,
    getNREGSTransactionsCount,
    getPensionTransactions,
    getPensionTransactionsCount
}

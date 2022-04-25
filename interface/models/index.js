const databaseConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: databaseConfig.pool.max,
        min: databaseConfig.pool.min,
        acquire: databaseConfig.pool.acquire,
        idle: databaseConfig.pool.idle
    },
    define: {
        timestamps: false
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.citizens = require('./citizens.model.js')(Sequelize, sequelize);
db.village_master = require('./village_master.model.js')(Sequelize, sequelize);

module.exports = db;

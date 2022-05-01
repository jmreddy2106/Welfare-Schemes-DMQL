require('dotenv').config();
module.exports = {
    // The name of the database
    database: process.env.DATABASE,
    // The username used to connect to the database
    username: process.env.USERNAME,
    // The password used to connect to the database
    password: process.env.PASSWORD,
    // The dialect of the database you are connecting to
    dialect: 'postgres',
    // The host of the database
    host: process.env.HOST,
    // The port of the database
    port: 5432,
    // Setup pool of connections to the database
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

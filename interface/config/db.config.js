module.exports = {
    // The name of the database
    database: 'WelfareSchemes',
    // The username used to connect to the database
    username: 'postgres',
    // The password used to connect to the database
    password: 'lucifer',
    // The dialect of the database you are connecting to
    dialect: 'postgres',
    // The host of the database
    host: 'localhost',
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

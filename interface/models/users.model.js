module.exports = (Sequelize, sequelize) => {
    const Users = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING(155),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(155),
            allowNull: false,
        }
    });
    return Users;
}
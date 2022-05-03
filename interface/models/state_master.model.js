module.exports = (Sequelize, sequelize) => {
    const StateMaster = sequelize.define("state_master", {
        state_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        state_name: {
            type: Sequelize.STRING(155),
            allowNull: false,
        },
    });
    return StateMaster;
}

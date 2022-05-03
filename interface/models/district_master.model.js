module.exports = (Sequelize, sequelize) => {
    const DistrictMaster = sequelize.define("district_master", {
        district_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        district_name: {
            type: Sequelize.STRING(155),
            allowNull: false,
        },
        state_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // FOREIGN KEY (state_id) REFERENCES public.state_master(state_id) ON DELETE CASCADE;
            references: {
                model: "state_master",
                key: "state_id",
                onDelete: "CASCADE",
            },
        },
    });
    return DistrictMaster;
}

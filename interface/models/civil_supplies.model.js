module.exports = (Sequelize, sequelize) => {
    const CivilSupplies = sequelize.define("civil_supplies", {
        civil_supply_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        annual_income_year: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        job_type: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        ration_shopno: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        citizen_id: {
            type: Sequelize.STRING(20),
            allowNull: false,
            // FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;
            references: {
                model: "civil_supplies",
                key: "citizen_id",
                onDelete: "CASCADE",
            },
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return CivilSupplies;
}

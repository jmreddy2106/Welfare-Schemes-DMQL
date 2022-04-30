module.exports = (Sequelize, sequelize) => {
    const BankMaster = sequelize.define("bank_master", {
        bank_account: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        ifsc_code: {
            type: Sequelize.STRING(12),
            allowNull: false
        },
        bank_name : {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        branch_name : {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        citizen_id : {
            type: Sequelize.STRING(12),
            allowNull: false,
            references : {
                model : "citizens",
                key : "citizen_id",
                onDelete : "CASCADE"
            }
        }
    });
    return BankMaster;
};

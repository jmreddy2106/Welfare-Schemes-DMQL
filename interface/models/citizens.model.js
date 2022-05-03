
module.exports = (Sequelize, sequelize) => {
  const Citizens = sequelize.define("citizens", {
    citizen_id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    middle_name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    mobile_num: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING(1),
      allowNull: false,
    },
    marital_status: {
      type: Sequelize.STRING(5),
      allowNull: false,
    },
    disabled: {
      type: Sequelize.STRING(3),
      allowNull: false,
      defaultValue: "No",
    },
    disbaled_percentage: {
      // numeric(10,3)
      type: Sequelize.DECIMAL(10, 3),
    },
    caste: {
      type: Sequelize.STRING(2),
      allowNull: false,
    },
    village_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // FOREIGN KEY (village_id) REFERENCES public.village_master(village_id) ON DELETE CASCADE;
      references: {
        model: "village_master",
        key: "village_id",
        onDelete: "CASCADE",
      },
    },
  });

  return Citizens;
};

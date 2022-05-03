module.exports = (Sequelize, sequelize) => {
  const MandalMaster = sequelize.define("mandal_master", {
    mandal_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mandal_name: {
      type: Sequelize.STRING(155),
      allowNull: false,
    },
    district_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // FOREIGN KEY (district_id) REFERENCES public.district_master(district_id) ON DELETE CASCADE;
      references: {
        model: "district_master",
        key: "district_id",
        onDelete: "CASCADE",
      },
    },
  });
  return MandalMaster;
};

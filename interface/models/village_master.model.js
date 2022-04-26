module.exports = (Sequelize, sequelize) => {
  const VillageMaster = sequelize.define("village_master", {
    village_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    village_name: {
      type: Sequelize.STRING(155),
      allowNull: false,
    },
    mandal_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // FOREIGN KEY (mandal_id) REFERENCES public.mandal_master(mandal_id) ON DELETE CASCADE;
      references: {
        model: "mandal_master",
        key: "mandal_id",
        onDelete: "CASCADE",
      },
    },
  });
  return VillageMaster;
};


// models/File.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    files_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clearance_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

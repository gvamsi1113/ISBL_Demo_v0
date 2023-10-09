const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_name: {
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // // Define the association with the Users model
  // Employee.associate = (models) => {
  //   Employee.hasOne(models.Users, {
  //     foreignKey: 'emp_id', // This links the emp_id column in Users to the id column in Employee
  //   });
  // };

  return Employee;
};


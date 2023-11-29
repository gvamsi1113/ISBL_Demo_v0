const Employee = require('./employees');
const File = require('./files');
module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
      request_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      request_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      StatusOfRequest: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      acceptedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  
    // Define the associations (foreign key relationships)
    Request.belongsTo(sequelize.models.Employee, {
      foreignKey: 'emp_ID',
      targetKey: 'id',
    });
  
    Request.belongsTo(sequelize.models.File, {
      foreignKey: 'file_ID',
      targetKey: 'id',
    });
  
    return Request;
  };
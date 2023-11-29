module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {  
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1, // Set the default value to 1
      },  
    }); 
  
    // Users.associate = (models) => {
    //     Users.belongsTo(models.Employee, {
    //       foreignKey: 'emp_id', // This links the emp_id column in Users to the id column in Employee
    //       onDelete: 'CASCADE', // This ensures that if an Employee is deleted, the corresponding User is also deleted
    //     });
    //   };


    return Users;
  };
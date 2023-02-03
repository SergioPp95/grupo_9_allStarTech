module.exports = (sequelize, dataTypes) => {

    const alias = "User"

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mail: {
            type: dataTypes.TEXT
        },
        name: {
            type: dataTypes.STRING,
        },
        last_name: {
            type: dataTypes.STRING,
        },
        password: {
            type: dataTypes.STRING
        },
        picture:{
            type: dataTypes.TEXT
        },
        is_admin: {
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName: 'users',
        timestamps: true,
        paranoid: true
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
      User.hasMany(models.Product, {
          as: 'Products',
          foreignKey: 'seller_id'
      })
  };

    return User;

}
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
            type: datatypes.STRING
        },
        is_admin: {
            type: datypes.STRING
        }
    }

    const config = {
        tableName: 'users',
        timestamps: true,
        paranoid: true
    };

    const User = sequelize.define(alias, cols, config);

    return User;

}
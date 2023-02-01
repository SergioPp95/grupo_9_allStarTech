module.exports = (sequelize, dataTypes) => {

    const alias = "Category"

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
        }
    }

    const config = {
        tableName: 'categories',
        timestamps: true,
        paranoid: true
    }

    const Category = sequelize.define(alias, cols, config)

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "Products",
            foreignKey: "category_id"
        })
    };

    return Category;

}
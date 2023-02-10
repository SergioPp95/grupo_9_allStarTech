module.exports = function products(sequelize, dataTypes) {

    const alias = "Product"

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
        },
        price: {
            type: dataTypes.INTEGER,
        },
        category_id: {
            type: dataTypes.INTEGER,
        },
        seller_id: {
            type: dataTypes.INTEGER,
        },
        img1: {
            type: dataTypes.TEXT,
        },
        img2: {
            type: dataTypes.TEXT,
        },
        description: {
            type: dataTypes.TEXT,
        },
        discount: {
            type: dataTypes.INTEGER,
        }
    }

    const config = {
        tableName: 'products',
        timestamps: true,
        paranoid: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })
        Product.belongsTo(models.User, {
            as: 'seller',
            foreignKey: 'seller_id'
        })
    };

    return Product;

}

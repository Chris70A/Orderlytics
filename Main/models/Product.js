// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,                      // number
      allowNull: false,                             // cannot be Empty
      primaryKey: true,                             // primary key
      autoIncrement: true,                          // Increment by 1 each time a new row is added
    },
    product_name: {
      type: DataTypes.STRING,                       // data type is string
      allowNull: false,                             // cannot be Empty
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),               // store numbers with up to 10 digits before and 2 digits after the decimal point.
      allowNull: false,                             // cannot be Empty
      validate: {                 
        isDecimal: true,                            // validate that it is a decimal
      },
    },
    stock: {
      type: DataTypes.INTEGER,                      // number
      allowNull: false,                             // cannot be Empty
      defaultValue: 10,                             // value is 10
      validate: {
        isNumeric: true,                            // validate that it is a numeric value
      },
    },
    category_id: {
      type: DataTypes.INTEGER,                       // number 
      allowNull: true,                               // cannot be Empty
      references: {
        model: 'category',                           // foreign key references category
        key: 'id',                                   // foreign key is the id column of category
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

// Import modules from sequelize package
const { Model, DataTypes } = require('sequelize');
// Import connection to database
const sequelize = require('../config/connection.js');
// Extension of sequelizes Model class
class Category extends Model {}
// Category model and define the columns and model options.
Category.init(
  {
    // column: ID
    id: { 
      type: DataTypes.INTEGER, // Number
      allowNull: false,        // Cannot be Empty 
      primaryKey: true,       // Primary key for the model.
      autoIncrement: true,    // Increment by 1 each time a new row is added
    }, // column: category_name
    category_name: {          // Column named "category_name"
      type: DataTypes.STRING, // Datatype is set to string
      allowNull: false,       // Cannot be Empty
    },
  },
  { // model options
    sequelize,                  // Sequelize object used to create the model
    timestamps: false,          // Timestamp field
    freezeTableName: true,      // Convert a word into its plural form "cat"/"cats"
    underscored: true,          // False: camelCase  True: snake_case
    modelName: 'category',      
  }
);
// Export Category model
module.exports = Category;

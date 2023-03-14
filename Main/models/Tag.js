const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,                              // number
      allowNull: false,                                     // cannot be Empty
      primaryKey: true,                                     // primary key
      autoIncrement: true,                                  // increment by 1 each time a new row is added
    },
    tag_name: {
      type: DataTypes.STRING,                               // string data type
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;

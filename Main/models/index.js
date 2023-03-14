// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');



// Finding associations between models

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',                // Foreign key constraint
  onDelete: 'CASCADE',                      // Deletion rule
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',               // Foreign key constraint
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,                    //  Join table
  foreignKey: 'product_id',               // Foreign key constraint
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,                    // Join table
  foreignKey: 'tag_id',                  // Foreign key constraint
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

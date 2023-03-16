const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {                   
  Product.findAll({                                   // Find all Products
    include: [                                        // Include category module
      Category,
      {
        model: Tag,                                   // Tag model
        through: ProductTag,                          // Use productTag as a bridge table    
      },
    ],
  })
    .then((products) => res.json(products))           // Found products in JSON
    .catch((err) => {                                 // Handle errors
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  Product.findOne({                                  // Find one product by its id
    where: {
      id: req.params.id,                             // Using the id parameter from the URL
    },
    include: [                                       // Connected Category and Tag models
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((products) => res.json(products))         // Return products in JSON 
    .catch((err) => {                               // Handle errors
      console.log(err);
      res.status(400).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)                             // Create new Product from request body data
    .then((product) => {                                    // If success 
      if (req.body.tagIds && req.body.tagIds.length) {      // Return tags and products that are associated
        const productTagIdArr = req.body.tagIds.map((tag_id) => {   // ProductTag IDs array
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);            // Bulk create ProductTag association
      }
      
      res.status(200).json(product);                                 // If non, respond with the created Product
    })
    .then((productTagIds) => res.status(200).json(productTagIds))    // Returned JSON response with status
    .catch((err) => {           
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;

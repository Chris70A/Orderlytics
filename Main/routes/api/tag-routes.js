const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {                     // GET requests /tags endpoint
  Tag.findAll({                                     // Return all tags
    include: [                                      // Product with tag
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tags) => res.status(200).json(tags))     // Return tags in JSON format
    .catch((err) => res.status(500).json(err));     // Catch Error
});

router.get('/:id', (req, res) => {                  // Requests /tags/:id endpoint
  Tag.findOne({                                     // Return tag by ID
    where: {
      id: req.params.id,                            // Using the id parameter from the URL
    },
    include: [                                      // Product with tag
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))       // Returns tag in JSON format
    .catch((err) => res.status(404).json(err));     // Catch Error
});

router.post('/', (req, res) => {                    // Requests to the / endpoint
  Tag.create(req.body)                              // Creates new Tag record with data sent in request body
    .then((tag) => res.status(200).json(tag))       // Returns new tag
    .catch((err) => res.status(404).json(err));     // Catch Error
});

router.put('/:id', (req, res) => {                  // Create PUT route with parameter :id
  Tag.update(req.body, {                            // Update the Tag model with request body 
    where: {
      id: req.params.id,                            // Update tag with matching ID
    },
  })
    .then((tag) => res.status(200).json(tag))       // Updated Tag object in JSON
    .catch((err) => res.status(404).json(err));     // Catch error
});

router.delete('/:id', (req, res) => {               // Delete request for /:id endpoint
  Tag.destroy({                                     // Delete tag model
    where: {
      id: req.params.id,                            // ID matches :id parameter
    },
  })
    .then((tag) => res.status(200).json(tag))       // Delete tag
    .catch((err) => res.status(404).json(err));     // Catch error 
});

module.exports = router;

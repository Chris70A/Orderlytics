const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({                              // Categories from database
    include: [Product],                           // Get the products connected to each category.
  })
    .then((categories) => res.json(categories))   // Send response with categories in JSON
    .catch((err) => res.status(500).json(err));   // Error response if something goes wrong
});

router.get('/:id', (req, res) => {   //              /:id endpoint
  Category.findOne({                              // Find a one category by its ID
    where: {
      id: req.params.id,                          // ID from the request parameter
    },
    include: [Product],                           // linked Products with the Category
  })
    .then((category) => res.json(category))        // Response with Category in JSON format
    .catch((err) => res.status(400).json(err));   // Error response if Category not found
});

router.post('/', (req, res) => {
  Category.create(req.body)                                // Create a new category with the request
    .then((category) => res.status(200).json(category))    // Success response // Created Category in JSON format
    .catch((err) => res.status(400).json(err));            // Error response if not created
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {                             // Update category ID with request 
    where: {
      id: req.params.id,                                  // Get ID from request parameter
    },
  })
    .then((category) => res.status(200).json(category))   // Success response // updated Category in JSON format
    .catch((err) => res.status(400).json(err));           // Error response if not updated
});

router.delete('/:id', (req, res) => {
  Category.destroy({                                      // Delete category by ID
    where: {
      id: req.params.id,                                  // Get ID from request parameter
    },
  })
    .then((category) => res.status(200).json(category))   // success response // deleted Category in JSON format
    .catch((err) => res.status(400).json(err));           // Error response if not deleted
});

module.exports = router;

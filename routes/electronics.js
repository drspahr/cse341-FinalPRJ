/**************************************  
 ROUTES FOR ADDING, GETTING, UPDATING, DELETING 
 IN THE ELECTRONICS SECTION
 **************************************/

const express = require('express');
const router = express.Router();
const elecController = require('../controllers/electronics');
const validate = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

// GET routes
router.get('/inventory', elecController.getOneInventItem);
router.get('/inventory/:id', elecController.getOneInventItem);
router.get('/inventory/:id', elecController.getMultiInventItems);

// POST route
router.post('/inventory', isAuthenticated, elecController.addInvent);
// PUT route
router.put('/inventory/:id', isAuthenticated, elecController.updateInvent);
// DELETE route
router.delete('/inventory/:id', isAuthenticated, elecController.deleteInvent);

module.exports = router;

/* ***************************************************
 * ROUTES FOR GETTING, ADDING, UPDATING and DELETING 
 * ITEMS IN GROCERIES COLLECTION 
 * **************************************************/

const express = require('express');
const router = require('express').Router();
const clothingController = require('../controllers/clothing');
const validate = require('../middleware/validate');
const { isAuthenticate } = require('../middleware/authenticate');

// GET Routes, all clothing and clothing by id
router.get('/item', clothingController.getAllClothing);
router.get('/item/:id', clothingController.getClothingById);

// POST New clothing to collection
router.post('/item', validate.clothingItemValidate, clothingController.addNewClothing);

// UPDATE clothing record
router.put('/item/:id', validate.clothingItemValidate, clothingController.updateClothingById);

// DELETE clothing record
router.delete('/item/:id', clothingController.deleteClothing);

module.exports = router;
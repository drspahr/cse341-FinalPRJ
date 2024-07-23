/* ***************************************************
 * ROUTES FOR GETTING, ADDING, UPDATING and DELETING 
 * ITEMS IN GROCERIES COLLECTION 
 * **************************************************/

const express = require('express');
const router = require('express').Router();
const grocController = require('../controllers/groceries');
const validate = require('../middleware/validate');
const { isAuthenticate } = require('../middleware/authenticate');

// GET Routes, all items and one item by category in groceries collection
router.get('/item', grocController.getAllItems);
router.get('/item/:category', grocController.getItemsByCat);

// POST Item to groceries collection
router.post('/item', validate.saveGroceryItemValidate, grocController.addItem);

// UPDATE Item by category in groceries collection
router.put('/item/:id', validate.saveGroceryItemValidate, grocController.updateItem);

// DELETE Item by id in groceries collection
router.delete('/item/:id', grocController.deleteItem);

module.exports = router;
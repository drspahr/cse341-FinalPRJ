/* ***************************************************
 * ROUTES FOR GETTING, ADDING, UPDATING and DELETING 
 * USERS IN USER MANAGEMENT
 * **************************************************/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/usermanage');
const validate = require('../middleware/validate');
const { isAuthenticate } = require('../middleware/authenticate');

// GET routes
router.get('/user', userController.getOneUser);
router.get('/user/:id', userController.getOneUser);
router.get('/user/:id', userController.getMultiUsers);

// PUT route
router.post('/user', userController.addUser);
// POST route
router.post('/user', userController.updateUserbyId);
// DELETE route
router.delete('/delete', userController.deleteUser);

module.exports = router;
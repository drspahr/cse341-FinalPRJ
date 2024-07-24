/**************************************  
 Functions to create, get, update, and delete
 records to and from the user management
 **************************************/
 const mongodb = require('../data/db');
 const ObjectId = require('mongodb').ObjectId;

// GET ONE USER
const getOneUser = async(req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDb().db().collection('usermanageme').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users)
    });
};
// GET ALL USERS
const getMultiUsers = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDb().db().collection('usermanage').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users)
    });
};

const addUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };
    const response = await mongodb.getDb().db().collection('usermanage').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating record');
    }
};

const updateUserbyId = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };
    const response = await mongodb.getDb().db().collection('usermanage').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating record');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('usermanage').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting record');
    }
};

module.exports = {
    getOneUser,
    getMultiUsers,
    addUser,
    updateUserbyId,
    deleteUser
};
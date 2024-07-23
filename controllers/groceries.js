/* **********************************************
 * Functions to create, get, update, and delete
 * records to and from the groceries collection
 * *********************************************/
const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

// GET ALL RECORDS IN GROCERIES COLLECTION
const getAllItems = async (req, res) => {
    //#swagger.tags=['Groceries']
    const result = await mongodb.getDb().db().collection('groceries').find();
    result.toArray().then((items) => {
        res.setHeader('Contents-Type', 'application/json');
        res.status(200).json(items);
    });
}

// GET ALL RECORDS IN A GIVEN CATEGORY
const getItemsByCat = async (req, res) => {
    //#swagger.tags=['Groceries']
    const grocCat = req.params.category;
    const result = await mongodb.getDb().db().collection('groceries').find({category: grocCat});
    result.toArray().then((items) => {
        res.setHeader('Contents-Type', 'application/json');
        res.status(200).json(items);
    });
}

// POST NEW RECORD
const addItem = async (req, res) => {
    //#swagger.tags=['Groceries']
    const item = {
        category: req.body.category,
        itemDescription: req.body.itemDescription,
        price: req.body.price,
    };
    const response = await mongodb.getDb().db().collection('groceries').insertOne(item);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating record');
    }
}

// UPDATE RECORD BY id
const updateItem = async (req, res) => {
    //#swagger.tags=['Groceries']
    const itemId = new ObjectId(req.params.id);
    const item = {
        category: req.body.category,
        itemDescription: req.body.itemDescription,
        price: req.body.price,
    };
    const response = await mongodb.getDb().db().collection('groceries').replaceOne({_id: itemId}, item);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating record');
    }
}

// DELETE RECORD BY ID
const deleteItem = async (req, res) => {
    //#swagger.tags=['Groceries']
    const itemId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('groceries').deleteOne({_id: itemId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting record');
    }
}

module.exports = {
    getAllItems,
    getItemsByCat,
    addItem,
    updateItem,
    deleteItem,
}
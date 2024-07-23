/*****************************************  
 Functions to create, get, update, and delete
 records to and from the clothing section
 ******************************************/

const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

// GET ALL RECORDS IN CLOTHING COLLECATION
const getAllClothing = async (req, res) => {
    //#swagger.tags=['Clothing']
    const result = await mongodb.getDb().db().collection('clothing').find();
    result.toArray().then((items) => {
        res.setHeader('Contents-Type', 'application/json');
        res.status(200).json(items);
    });
}

// GET CLOTHING RECORD BY ID FROM COLLECTION
const getClothingById = async (req, res) => {
    //#swagger.tags=['Clothing']
    const clothId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('clothing').find({_id: clothId});
    result.toArray().then((item) => {
        res.setHeader('Contents-Type', 'application/json');
        res.status(200).json(item);
    });
}

// POST NEW CLOTHING RECORD TO COLLECTION
const addNewClothing = async (req, res) => {
    //#swagger.tags=['Clothing']
    const item = {
        item: req.body.item,
        price: req.body.price,
    };
    const response = await mongodb.getDb().db().collection('clothing').insertOne(item);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating record');
    }
}

// UPDATE CLOTHING RECROD BY ID
const updateClothingById = async (req, res) => {
    //#swagger.tags=['Clothing']
    const clothId = new ObjectId(req.params.id);
    const items = {
        item: req.body.item,
        price: req.body.price,
    };
    const response = await mongodb.getDb().db().collection('clothing').replaceOne({_id: clothId}, items);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating record');
    }
}

// DELETE CLOTHING RECORD BY ID
const deleteClothing = async (req, res) => {
    //#swagger.tags=['Clothing']
    const clothId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('clothing').deleteOne({_id: clothId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting record');
    }
}

module.exports = {
    getAllClothing,
    getClothingById,
    addNewClothing,
    updateClothingById,
    deleteClothing
}
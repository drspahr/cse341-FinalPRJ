/*****************************************  
 Functions to create, get, update, and delete
 records to and from the electronics section
 ******************************************/

const mongodb = require('../data/db');
const ObjectId = require('mongodb').ObjectId;

// GET ONE ITEM IN THE ELECTRONICS INVENTORY
const getOneInventItem = async (req, res) => {
    //#swagger.tags=['Electronics']
    const result = await mongodb.getDb().db().collection('electronics').find()
    result.toArray().then((electronics) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(electronics);
    })
};

// GET MULTIPLE ITEMS IN THE ELECTRONICS INVENTORY
const getMultiInventItems = async (req, res) => {
    //#swagger.tags=['Electronics']
    const electId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('electronics').find()
    result.toArray().then((electronics) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(electronics);
    })
};

// GET ELECTRONICS INVENTORY ITEM BY CATEGORY
const getInventByCat = async (req, res) => {
    //#swagger.tags=['Electronics']
    const inventCat = new ObjectId(req.params.category)
    const result = await mongodb.getDb().db().collection('electronics').find({category: inventCat});
    result.toArray.then((electronics) => {
        res.SetHeader('Content-Type', 'application/json')
        res.status(200).json(electronics);
    })
}

const addInvent = async (req, res) => {
    //#swagger.tags=['Electronics']
    const inventId = new ObjectId(req.params.id);
    const invent = {
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
    }
    const response = await mongodb.getDatabase().db().collection('electronics').insertOne({invent})
    if (response.modifiedCount > 0) {

        res.status(204).send() }
            else {
                res.status(500).json(response.error || `An error occured while updating the user.`)
            }
};

const updateInvent = async (req, res) => {
    //#swagger.tags=['Electronics']
    const inventId = new ObjectId(req.params.id);
    const invent = {
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
    }
    const response = await mongodb.getDatabase().db().collection('electronics').replaceOne({invent}, invent)
    if (response.modifiedCount > 0) {
        res.status(204).send() }
            else {
                res.status(500).json(response.error || `An error occured while updating the user.`)
            }
};

const deleteInvent = async (req, res) => {
    //#swagger.tags=['Electronics']
    const inventId = new ObjectId(req.params.id);
    const invent = await mongodb.getDatabase().db().collection('electronics').remove({_id: inventId}, true)
    if (response.modifiedCount > 0) {
        res.status(204).send() } 
        else {
            application.listen(port, () => (console.log(`Database is listening and node is Running on port ${port}`)));
        }
    };

module.exports = {
    getOneInventItem,
    getMultiInventItems,
    getInventByCat,
    addInvent,
    updateInvent,
    deleteInvent
}
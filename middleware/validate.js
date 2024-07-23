const validate = require('../helper/validate');

// GROCERIES VALIDATION
const saveGroceryItemValidate = (req, res, next) => {
    const grocValidateRule = {
        category: 'required|string',
        itemDescription: 'required|string',
        price: 'required|string',
    };
    validate(req.body, grocValidateRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
}

// CLOTHING VALIDATION
const clothingItemValidate = (req, res, next) => {
    const clothValidateRule = {
        item: 'required|string',
        price: 'required|string',
    };
    validate(req.body, clothValidateRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
}

module.exports = {
    saveGroceryItemValidate,
    clothingItemValidate
}
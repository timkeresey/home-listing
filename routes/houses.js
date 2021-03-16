const express = require('express');
const {check, validationResult} = require('express-validator');
const House = require('../models/House');

const router = express.Router();

const validate = [
    check('title')
        .isLength({min: 3, max: 50})
        .withMessage('Title should be 3 to 50 characters'),
    check('description')
        .isLength({min: 10, max: 200})
        .withMessage('Description should be 10 to 200 characters'),
    check('address')
        .isLength({min: 10, max: 100})
        .withMessage('Address should be 10 to 100 characters'),
    check('price')
        .isNumeric()
        .withMessage('Price should be a number')
]

// /api/houses
router.post('/', validate, (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).sen({errors: errors.array()});
    }

    const house = new House({
        title: req.body.title,
        address: req.body.address,
        homeType: req.body.homeType,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        yearBuilt: req.body.yearBuilt
    });

    house.save()
        .then(result => {
            res.send({
                message: 'House data created successfully',
                data: result 
            })
        })
        .catch(err => console.log(err))
})

module.exports = router;
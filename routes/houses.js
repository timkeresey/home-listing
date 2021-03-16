const express = require('express');
const {check, validationResult} = require('express-validator');
const House = require('../models/House');

const router = express.Router();

// express validation
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

// posting new data to route /api/houses
router.post('/', validate, (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({errors: errors.array()});
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

// get request from route /api/houses 
router.get('/', (req, res) => {
    House.find()
        .then(houses => {
            res.send(houses)
        })
        .catch(err => console.log(err))
});

// get request for single piece of data from /api/houses
router.get('/:id', (req, res) => {
    const houseId = req.params.id;

    House.findById(houseId)
        .then(house => {
            res.send(house);
        })
        .catch(err => console.log(err))
})

// put request
router.put('/:id', validate, (req, res) => {
    const houseId = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({errors: errors.array()});
    }

    House.findById(houseId)
        .then(house => {
            house.title = req.body.title;
            house.address = req.body.address;
            house.homeType = req.body.homeType;
            house.description = req.body.description;
            house.price = req.body.price;
            house.image = req.body.image;
            house.yearBuilt = req.body.yearBuilt;

            return house.save();
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err))
});

// delete request to /api/houses
router.delete('/:id', (req, res) => {
    const houseId = req.params.id;

    House.findByIdAndRemove(houseId)
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

module.exports = router;
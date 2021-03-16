const express = require('express');
const House = require('../models/House');

const router = express.Router();

// /api/houses
router.post('/', (req, res) => {
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
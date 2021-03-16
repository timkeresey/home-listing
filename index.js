const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());


require('dotenv').config();

const homes = [
    {
        id: 1,
        type: 'Apartment',
        description: 'Well furnished apartment'
    },
    {
        id: 2,
        type: 'Flat',
        description: 'Well furnished flat in Denver'  
    }
]

const checkId = (req, res, msg) => {
    const home = homes.find(home => home.id === parseInt(req.params.id));

    if (!home) {
        res.status(404).send('The home with the given ID cannot be found');
    }
}

app.get('/', (req, res) => {
    res.send('xxx');
})

app.get('/api/listing', (req, res) => {
    res.send(homes)
})

app.get('/api/listing/:id', (req, res) => {
    checkId(req, res);

    res.send(home);
})

app.post('/api/listing', (req, res) => {

    if(!req.body.type || !req.body.description) {
        return res.status(400).send('Type and Description are required');
    }

    const home = {
        id: homes.length + 1,
        type: req.body.type,
        description: req.body.description
    }

    homes.push(home);
    res.send(home);
})

app.put('/api/listing/:id', (req, res) => {
    checkId(req, res);

    home.type = req.body.type;
    home.description = req.body.description;

    res.send(home);
})

app.delete('/api/listing/:id', (req, res) => {
    const home = homes.find(home => home.id === parseInt(req.params.id));
    if (!home) {
        res.status(404).send('The home with the given ID cannot be found');
    }

    const index = homes.indexOf(home);
    homes.splice(index, 1);
    res.send(home);
})

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`server running on port ${port}`));
const express = require('express');

const app = express();

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

app.get('/', (req, res) => {
    res.send('xxx');
});

app.get('/api/listing', (req, res) => {
    res.send(homes)
});

app.get('/api/listing/:id', (req, res) => {
    const home = homes.find(home => home.id === parseInt(req.params.id));

    if (!home) {
        res.status(404).send('The home with the given ID cannot be found')
    }

    res.send(home);
});

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`server running on port ${port}`));
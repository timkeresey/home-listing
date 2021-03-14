const express = require('express');

const app = express();

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('xxx');
});

app.get('/api/listing', (req, res) => {
    res.send([
        {id: 1, roomType: 'Duplex'}, 
        {id: 2, roomType: 'Flat'}
    ]);
})

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`server running on port ${port}`));
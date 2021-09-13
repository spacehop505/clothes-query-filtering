const express = require('express');
const data = require('./data');
const app = express();

const ClothesRoutes = require('./controllers/clothes.routes.js');


app.use(express.json());
//Allow Access Control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/clothing', ClothesRoutes);


// Start server on PORT 5000
app.listen(5000, () => {
    console.log('Server started!');
});
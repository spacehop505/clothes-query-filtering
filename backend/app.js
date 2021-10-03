const express = require('express');
const app = express();

const routeClothing = require('./routes/routeClothing');


app.use(express.json());
//Allow Access Control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/clothing', routeClothing);


// Start server on PORT 5000
const port = 5000;
app.listen(port, () => {
    console.log(`Server started! Port ${port} \n`);
});
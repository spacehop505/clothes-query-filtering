const express = require('express');
const router = express.Router();

const mysql = require('mysql2');


router.get('/', (req, res, next) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'clothes',
        password: 'admin'
    });


    const arrayWHERE = [];
    const arrayORDER = [];
    const arrayJOIN = [];

    const queryPrice = req.query.price;
    const querySize = req.query.size;
    const queryMaterial = req.query.material;



    if (queryPrice) {
        arrayWHERE.push(`price=${queryPrice}`);
    }
    if (querySize) {
        arrayWHERE.push(`size='${querySize}'`);
    }
    if (queryMaterial) {
        arrayWHERE.push(`material='${queryMaterial}'`);
    }

    const queryCategory = req.query.category;
    if (queryCategory) {
        arrayJOIN.push(`true`);
        arrayWHERE.push(`category_category_id='${queryCategory}'`);
    }

    const queryDir = req.query.dir;
    const queryOrder = req.query.order;


    if (queryDir && queryOrder) {
        arrayORDER.push(`${queryDir}`);
        arrayORDER.push(`${queryOrder}`);
    }

    console.log(queryPrice, querySize, arrayWHERE);
    console.log(queryDir, queryOrder, arrayORDER);
    const query = `SELECT * FROM clothing 
    ${arrayJOIN.length ? `inner join category on clothing.category_category_id = category.category_id` : ''}
    ${arrayWHERE.length ? `WHERE ${arrayWHERE.join(' AND ')}` : ''} 
    ${arrayORDER.length ? `ORDER BY ${arrayORDER[1]} ${arrayORDER[0]}` : ''} `;
    console.log(query);

    connection.promise().query(query)
        .then(([rows, fields]) => {
            res.status(200).json({
                count: rows.length,
                content: rows
            });
        }).catch(err => {
            console.log(err);
        }).then(() => {
            connection.end();
        });
});

module.exports = router;
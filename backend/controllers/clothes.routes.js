const mysql = require('mysql2');
const path = require("path");
const express = require('express');
const router = express.Router();

// get clothes from query parameters 
router.get('/', (req, res, next) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'clothes',
        password: 'admin'
    });

    const arrayWHERE = [];
    const arrayORDER = [];
    // const arrayJoinCategory = [];
    // const arrayJoinBranding = [];

    // const queryPrice = req.query.price;
    const querySize = req.query.size;
    const queryMaterial = req.query.material;
    const queryCategory = req.query.category;
    const queryBranding = req.query.brand;

    //if (queryPrice) {
    //    arrayWHERE.push(`price=${queryPrice}`);
    // }
    if (querySize) {
        arrayWHERE.push(`size='${querySize}'`);
    }
    if (queryMaterial) {
        arrayWHERE.push(`material='${queryMaterial}'`);
    }
    if (queryCategory) {
        // arrayJoinCategory.push(`true`);
        arrayWHERE.push(`category_category_id='${queryCategory}'`);
    }
    if (queryBranding) {
        //  arrayJoinBranding.push(`true`);
        arrayWHERE.push(`branding_branding_id='${queryBranding}'`);
    }
    const queryDir = req.query.dir;
    const queryOrder = req.query.order;

    if (queryDir && queryOrder) {
        arrayORDER.push(`${queryDir}`);
        arrayORDER.push(`${queryOrder}`);
    }

    console.log('\nQUERY PARAMETERS => ', ',querySize:', querySize, ',queryMaterial:', queryMaterial, ',queryCategory:', queryCategory, ',queryBranding:', queryBranding, ',arrayWHERE:', arrayWHERE);
    console.log('QUERY PARAMETERS => ', 'queryDir:', queryDir, ',queryOrder:', queryOrder, ',arrayORDER:', arrayORDER);
    const query = `SELECT * FROM clothing inner join category on clothing.category_category_id = category.category_id inner join branding on clothing.branding_branding_id = branding.branding_id
    ${arrayWHERE.length ? `WHERE ${arrayWHERE.join(' AND ')}` : ''} 
    ${arrayORDER.length ? `ORDER BY ${arrayORDER[1]} ${arrayORDER[0]}` : ''} `;
    // ${arrayJoinCategory.length ? `inner join category on clothing.category_category_id = category.category_id` : ''}
    // ${arrayJoinBranding.length ? `inner join branding on clothing.branding_branding_id = branding.branding_id` : ''}

    final_query = query.replace(/(\r\n|\n|\r)/gm, "");
    console.log('SQL QUERY => ', final_query);

    connection.promise().query(final_query)
        .then(([rows, fields]) => {
            res.status(200).json({
                content: rows
            });
        }).catch(err => {
            console.log(err);
        }).then(() => {
            connection.end();
        });
});

// get clothing product by id
router.get('/product/:id', (req, res, next) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'clothes',
        password: 'admin'
    });
    connection.promise().query(`SELECT * FROM clothing 
    inner join category on clothing.category_category_id = category.category_id 
    inner join branding on clothing.branding_branding_id = branding.branding_id 
    where clothing_id=?`, [req.params.id])
        .then(([rows, fields]) => {
            res.status(200).json({
                content: rows
            });
        }).catch(err => {
            console.log(err);
        }).then(() => {
            connection.end();
        });
});


// get image file from hyperlink
router.get('/image/:name', (req, res, next) => {
    res.sendFile(path.join(__dirname, `./images/${req.params.name}`));
});


// get branding table for dropdown menu 
router.get('/branding', (req, res, next) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'clothes',
        password: 'admin'
    });
    connection.promise().query(`select * from branding;`)
        .then(([rows, fields]) => {
            res.status(200).json({
                content: rows
            });
        }).catch(err => {
            console.log(err);
        }).then(() => {
            connection.end();
        });
});

// get category table for dropdown menu 
router.get('/category', (req, res, next) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'clothes',
        password: 'admin'
    });
    connection.promise().query(`select * from category;`)
        .then(([rows, fields]) => {
            res.status(200).json({
                content: rows
            });
        }).catch(err => {
            console.log(err);
        }).then(() => {
            connection.end();
        });
});

module.exports = router;
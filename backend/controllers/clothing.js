const path = require("path");
const fs = require('fs');
const connectionRequest = require('../models/connectionRequest');

// get clothes from query parameters 
const getClothing = (req, res, next) => {

    const arraySqlWhere = []; // store Valid sql WHERE values
    const arraySqlOrderBy = []; // store Valid sql ORDER BY value
    const arrayQueryParams = []; // store Valid Query Parameters

    // URL Query Parameters for SQL WHERE 
    const querySize = req.query.size;
    const queryMaterial = req.query.material;
    const queryCategory = req.query.category;
    const queryBranding = req.query.brand;

    // URL Query Parameters for SQL ORDER BY 
    const queryDir = req.query.dir;
    const queryOrder = req.query.order;

    // Append To A Dynamic SQL WHERE query String, From Request Query Parameters 
    if (querySize) {
        arrayQueryParams.push(querySize);
        arraySqlWhere.push(`size=?`);
    }
    if (queryMaterial) {
        arrayQueryParams.push(queryMaterial);
        arraySqlWhere.push(`material=?`);
    }
    if (queryCategory) {
        arrayQueryParams.push(queryCategory);
        arraySqlWhere.push(`category_category_id=?`);
    }
    if (queryBranding) {
        arrayQueryParams.push(queryBranding);
        arraySqlWhere.push(`branding_branding_id=?`);
    }

    // Append To A Dynamic SQL ORDER BY query String, From Request Query Parameters 
    if (queryDir && queryOrder) {
        if ((queryDir == 'asc' || queryDir == 'desc') && queryOrder == 'price') {
            arraySqlOrderBy.push(`${queryOrder} ${queryDir}`);
        }
    }

    // Dynamic SQL Query String 
    const query = `SELECT * FROM clothing 
        inner join category on clothing.category_category_id = category.category_id 
        inner join branding on clothing.branding_branding_id = branding.branding_id
        ${arraySqlWhere.length ? `WHERE ${arraySqlWhere.join(' AND ')}` : ''} 
        ${arraySqlOrderBy.length ? `ORDER BY ${arraySqlOrderBy[0]}` : ''} `;
    str = query.replace(/(\r\n|\n|\r)/gm, "");
    final_query = str.replace(/\s{2,}/g, ' ');
    console.log('SQL QUERY => ', final_query);

    const connection = connectionRequest();
    connection.promise().query(final_query, arrayQueryParams)
        .then(([rows, fields]) => {
            res.status(200).json({ success: { status: 200, message: 'SQL_CLOTHING_ROWS_SENT', content: rows } });
            connection.end();
        })
        .catch(err => {
            res.status(400).json({ error: { status: 400, message: 'SQL_ERROR', error: err } });
        });
};

// get clothing by id
const getClothingByID = (req, res, next) => {
    try {
        const connection = connectionRequest();
        connection.promise().query(`SELECT * FROM clothing 
            inner join category on clothing.category_category_id = category.category_id 
            inner join branding on clothing.branding_branding_id = branding.branding_id 
            where clothing_id=?`, [req.params.id])
            .then(([rows, fields]) => {
                res.status(200).json({ success: { status: 200, message: 'SQL_CLOTHING_BY_ID_ROW_SENT', content: rows } });
                connection.end();
            })
            .catch(err => {
                res.status(400).json({ error: { status: 400, message: 'SQL_ERROR', error: err } });
            });
    } catch (err) {
        res.status(400).json({ error: { status: 400, message: 'BAD_REQUEST' } });
    }
};

// get image file from hyperlink
const getClothingImageByName = (req, res, next) => {
    const location = path.join(__dirname, `./images/${req.params.name}`);
    fs.readFile(location, (err, content) => {
        if (err) {
            res.status(400).sendFile(path.join(__dirname, `./images/not-found.png`));
        } else {
            res.status(200).sendFile(location);
        }
    });
};

module.exports = { getClothing, getClothingByID, getClothingImageByName };
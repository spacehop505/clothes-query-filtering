const connectionRequest = require('../models/connectionRequest');

// get branding table for dropdown menu 
const getBranding = (req, res, next) => {
    try {
        const connection = connectionRequest();
        connection.promise().query(`select * from branding;`)
            .then(([rows, fields]) => {
                res.status(200).json({ success: { status: 200, message: 'SQL_BRANDING_ROWS_SENT', content: rows } });
                connection.end();
            })
            .catch(err => {
                res.status(400).json({ error: { status: 400, message: 'SQL_ERROR', error: err } });
            });
    } catch (err) {
        res.status(400).json({ error: { status: 400, message: 'BAD_REQUEST' } });
    }
};

module.exports = { getBranding };
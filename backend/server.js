const express = require('express');
const { pool } = require('./db');

// Express init
const app = express();

// DB init
/*
pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields) => {
    console.log('result: ', results);
});
*/

// Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs
app.get('/api/values', (req, res) => {
    pool.query('SELECT * FROM lists;', (err, results, fields) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.json(results);
        }
    });
});

app.post('/api/value', (req, res, next) => {
    pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}");`, (err, results, fields) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.json({ success: true, value: req.body.value })
        }
    })
})

// Listen
app.listen(5000, () => {
    console.log('Port 5000 Listening');
});
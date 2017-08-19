var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.post('/', function (req, res) {
    pool.connect(function (errDatabase, client, done) {
        if (errDatabase) {
            console.log('Error connecting to database', errDatabase);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO employees (first_name, last_name, job_title, salary) VALUES ($1, $2, $3, $4);', [req.body.first_name, req.body.last_name, req.body.job_title, req.body.salary], function (errQuery, data) {
                done();
                if (errQuery) {
                    console.log('Error making database query', errQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.put('/:id', function (req, res) {
    console.log(req.body.status);
    
    pool.connect(function (errDatabase, client, done) {
        if (errDatabase) {
            console.log('Error connecting to database', errDatabase);
            res.sendStatus(500);
        } else {
            client.query('UPDATE employees SET is_active=$1 WHERE id=$2;', [req.body.status, req.params.id], function (errQuery, data) {
                done();
                if (errQuery) {
                    console.log('Error making database query', errQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.get('/', function (req, res) {
    pool.connect(function (errDatabase, client, done) {
        if (errDatabase) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM employees ORDER BY last_name ASC, first_name ASC;', function (errQuery, data) {
                done();
                if (errQuery) {
                    console.log('Error making database query', errQuery);
                    res.sendStatus(500);
                } else {
                    console.log(data.rows);
                    res.send(data.rows);
                }
            });
        }
    });
});

module.exports = router;
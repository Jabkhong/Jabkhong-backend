const express = require("express");
const router = express.Router();
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: process.env.HOST,
  port:   process.env.PORT,
  user:  process.env.USER,
  password:  process.env.PASSWORD,
  database:  process.env.DATABASE
  });


router.get('/', async (req, res) => {
    try{
    connection.query(
      'SELECT * FROM `report`',
      function(err, results, fields) {
        res.json(results);
      }
    );
    } catch(error){
        console.error(error);
        return res.status(500).send("Server error");
    }
});


module.exports = router
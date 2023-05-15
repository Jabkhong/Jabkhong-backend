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

router.get('/', async (req, res, next) => {
    try{
    connection.query(
      'SELECT * FROM `report`',
      function(err, results, fields) {
        const filters = req.query;
        const filterdUsers = results.filter(search => {
          let isValid = true;
          for (key in filters){
            console.log(key, search[key], filters[key]);
            isValid = isValid && search[key] == filters[key];
          }
          return isValid;
        });
        res.send(filterdUsers);        
      });
    } catch(error){
        console.error(error);
        return res.status(500).send("Server error");
    }
  
}
);


module.exports = router
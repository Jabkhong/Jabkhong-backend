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
      'SELECT * FROM `report_waitlist`',
      function(err, results, fields) {
        res.json(results);
      }
    );
    } catch(error){
        console.error(error);
        return res.status(500).send("Server error");
    }
});
router.post('/', (req, res) => {
    const name = req.body.name
    const details = req.body.details
    const bank = req.body.bank
    const promptpay = req.body.promptpay
    const truewallet = req.body.truewallet
    try{
    connection.query(
      "INSERT INTO `report_waitlist` (name, details, bank, promptpay, truewallet) VALUES (?,?,?,?,?)",
      [name, details, bank, promptpay, truewallet],
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
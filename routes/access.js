var express = require('express');
var router = express.Router();
const path = require('path');
//var mysql = require('mysql);  npm install mysql

/*
var connection = mysql.createConnection({
    host : 'localhost',
    port :  ,
    user : 'root',
    password : '1234',
    database : 'my_db'
});
connection.connect();
 */

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  
    } else {
        res.redirect('/login');
    }
};

router.get('/', isAuthenticated ,function(req, res){
    console.log('승인 창');
    res.sendFile(path.join(__dirname, '../views/access.html'));
});

router.post('/access_process', function(req, res){
    console.log('승인 여부');

    // var car_num = req.user.num;
    // connection.query('select * from customers', num, function(err, rows){
        res.render('../views/access_process.ejs');
    // })
});

router.get('/logout', function(req, res){
    delete req.session.userid;
    res.redirect('/');
});

module.exports = router;
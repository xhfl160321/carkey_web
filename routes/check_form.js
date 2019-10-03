var express = require('express');
var router = express.Router();
const path = require('path');

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  
    } else {
        res.redirect('/login');
    }
};

router.get('/', isAuthenticated ,function(req, res){
    console.log('확인 폼');
    res.sendFile(path.join(__dirname, '../views/check_form.html'));
});

router.get('/logout', function(req, res){
    delete req.session.userid;
    res.redirect('/');
});

module.exports = router;
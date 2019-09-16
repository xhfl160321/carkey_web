var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/',function(req, res){
    console.log('승인 창');
    res.sendFile(path.join(__dirname, '../views/access.html'));
});

router.post('/access_process', function(req, res){
    console.log('승인 여부');
});

module.exports = router;
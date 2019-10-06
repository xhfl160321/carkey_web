var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/',function(req, res, next) {
  console.log('테스트 데이터 삽입');
  res.render('../views/insertDB.ejs', { title:'Express' });
});
 
module.exports = router;
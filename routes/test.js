var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/',function(req, res, next) {
  console.log('테스트 서버');
  res.render('../views/test.ejs', { title:'Express' });
});
 
module.exports = router;
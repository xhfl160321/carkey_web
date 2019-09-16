var express = require('express');
var router = express.Router();
const path = require('path');
var session = require('express-session');

router.get('/', function(req, res){
    console.log('로그인 창');
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/', function(req, res){
    var user = {
        userid : 'admin',
        password : 'friend'
    };

    var id =  req.body.userid;
    var pwd = req.body.password;
    //아이디와 비번이 일치할 경우 승인 페이지로 넘어감
    if(id===user.userid && pwd === user.password){
        res.redirect('/access');
    }
    if(id!==user.userid){
        console.log('아이디 오류');
        res.send('아이디가 일치하지 않습니다 <a href="/">뒤로</a>');
    }
    if(pwd!==user.password){
        console.log('비밀번호 오류');
        res.send('비밀번호가 일치하지 않습니다 <a href="/">뒤로</a>');
    }
});



module.exports = router;
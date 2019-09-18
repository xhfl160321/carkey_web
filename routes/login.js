var express = require('express');
var router = express.Router();
const path = require('path');
var session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


var manager = {
    userid : 'admin',
    password : 'friend'
};
//로그인에 성공했을 시 한 번 호출됨 -> session에 저장됨
passport.serializeUser(function(user, done){
    console.log('serializeUser', user);
    done(null, user.userid);
});
//reload 할 때 마다 호출됨
passport.deserializeUser(function(id, done){
    console.log('deserializeUser', id);
    done(null, manager);
});

passport.use(new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
}, function(username, password, done){
    if(username===manager.userid && password === manager.password){
        console.log('로그인 성공');
        // res.redirect('/access');
        return done(null, manager);
    }
    else if(username!==manager.userid){
        console.log('아이디 오류');
        return done(null, false, {message : "아이디가 일치하지 않습니다"});
    }
    else if(password!==manager.password){
        console.log('비밀번호 오류');
        return done(null, false, {message : '비밀번호가 일치하지 않습니다'});
    }
}));

router.get('/', function(req, res){
    console.log('로그인 창');
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/', passport.authenticate('local', {
    successRedirect : '/access',
    failureRedirect : '/',
    failureFlash : true
}));

module.exports = router;



// res.send(`
// <script>
//     var result = confirm("비밀번호가 일치하지 않습니다.");

//     if(result){
//         location.href = "http://localhost:3000";
//     }
// </script>
// `);
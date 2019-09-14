var express = require('express');
var router = express.Router();
const path = require('path');
var session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(manager, done) {
    done(null, manager.id);
});

passport.deserializeUser(function(id, done) {
    done(err, user);
});

passport.use(new LocalStrategy({
    idField: 'id',
    passwordField: 'pw',
    session: true,
}, function(id, password, done) {
    if (err) {
        return done(err);
    }
    if (!manager) {
        return done(null, false, {message : '아이디가 틀렸습니다.'});
    }
    if (manager.password !== password) {
        return done(null, false, {message : '비밀번호가 틀렸습니다.'});
    }
    if(manager === 'admin' && manager.password === 'friend'){
        return done(null, manager);
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
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var longinRouter = require('./routes/login');

app.get('/', function(req, res){
    res.redirect('/login');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session ({
    secret : 'enter secret key',
    resave : false,
    saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', longinRouter);

app.listen(4000, function(req, res){
    console.log('server start');
});
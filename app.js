const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session'); //메모리 세션정보 저장 미들웨어
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var longinRouter = require('./routes/login');
var check_formRouter = require('./routes/check_form');
var insert_dbRouter = require('./routes/insert_db');
var check_listRouter = require('./routes/check_list');

app.use(express.static('public')); //정적 파일 읽어오기
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    console.log('/', req.user);
    res.redirect('/login');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session ({
    secret : 'enter secret key',
    resave : false,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/login', longinRouter);
app.use('/check_form', check_formRouter);
app.use('/insert_db', insert_dbRouter);
app.use('/check_list', check_listRouter);

app.listen(3000, function(req, res){
    console.log('server start');
});
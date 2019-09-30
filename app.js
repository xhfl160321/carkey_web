const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session'); //메모리 세션정보 저장 미들웨어
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var longinRouter = require('./routes/login');
var accessRouter = require('./routes/access');
var testrouter = require('./routes/test');
var listRouter = require('./routes/list');

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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', longinRouter);
app.use('/access', accessRouter);
app.use('/test', testrouter);
app.use('/list', listRouter);

app.listen(3000, function(req, res){
    console.log('server start');
});
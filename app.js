const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session'); //메모리 세션정보 저장 미들웨어
var longinRouter = require('./routes/login');
var accessRouter = require('./routes/access');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.redirect('/login');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session ({
    secret : 'enter secret key',
    resave : false,
    saveUninitialized : true
}));

app.use('/login', longinRouter);
app.use('/access', accessRouter);


app.listen(3000, function(req, res){
    console.log('server start');
});
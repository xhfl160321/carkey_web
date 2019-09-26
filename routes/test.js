var express = require('express');
var router = express.Router();
var firebase = require("firebase"); 
var admin = require('firebase-admin');

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('test', { title:'Express' });
  console.log('테스트 서버 시작');
});

var serviceAccount = require('path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smart-car-key-db.firebaseio.com/'
});

var firebaseConfig = {
    apiKey: "AIzaSyAFdthbekWyczCysEHPi3UPXDCL3xO1QWU",
    authDomain: "smart-car-key-db.firebaseapp.com",
    databaseURL: "https://smart-car-key-db.firebaseio.com",
    projectId: "smart-car-key-db",
    storageBucket: "",
    messagingSenderId: "872279683761",
    appId: "1:872279683761:web:af058a173e0188332ca890"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 


module.exports = router;

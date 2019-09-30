var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var dateFormat = require('dateformat');
 
// /* GET home page. */
// router.get('/',function(req, res, next) {
//   console.log('firebase에서 database 가져오기');
//   res.render('../views/list.ejs');
// });
 
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

router.get('/', function(req, res, next){
    firebase.database().ref('carkey').orderByKey().once('value', function(snapshot){
        var rows = [];
        snapshot.forEach(function(childSnapshot){
            var childData = childSnapshot.val();
            childData.brddate = dateFormat(childData.brddate, "yyyy-mm-dd");
            rows.push(childData);
        });
        console.log('firebase에서 database 가져오기');
        res.render('../views/list.ejs', {rows: rows});
    });
});

module.exports = router;
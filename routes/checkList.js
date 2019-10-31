var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var dateFormat = require('dateformat');
 
var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  
    } else {
        res.redirect('/login');
    }
};
 
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

router.get('/', isAuthenticated ,function(req, res, next){
    firebase.database().ref('carkey').orderByKey().once('value', function(snapshot){
        var rows = [];
        snapshot.forEach(function(childSnapshot){
            //var key = childSnapshot.key;
            //console.log(key)
            var childData = childSnapshot.val();
            childData.cdate = dateFormat(childData.cdate, "yyyy-mm-dd");
            childData.key = childSnapshot.key;
            rows.push(childData);
        });
        console.log('firebase에서 db 가져오기');
        res.render('../views/checkList.ejs', {rows: rows});
    }, function(err){
        throw err;
    });
});

router.post('/', isAuthenticated ,function(req, res, next){
    var showkey = firebase.database().ref('/carkey/')
    // showkey.on('child_added', function(childSnapshot){
    //     changeDB = firebase.database().ref('/carkey/'+childSnapshot.key).update({
    //         permit: true
    //     });
    // });
    console.log('데이터 수정 확인');
});

router.post('/update/permit', function(req, res){
    // delete req.session.userid;
    // res.redirect('/');
    console.log(req.body.key)
    firebase.database().ref("/carkey/"+req.body.key).update({
        permit:true
    })
    res.json({
        result:"ok"
    })
});
router.get('/logout', function(req, res){
    delete req.session.userid;
    res.redirect('/');
});

module.exports = router;
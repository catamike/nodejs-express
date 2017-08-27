'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/',
	passport.authenticate('facebook', { failureRedirect: '/login/fail' }),
	function(req, res, next) {
		next();
  	}
  );

router.get('/', function(req, res, next) {
  var db = req.app.db.model.User;
  db.find({}, function(err, users){
  	res.json(users);
  });
});

router.get('/:id', function(req, res, next) {
  var db = req.app.db.model.User;
  var id = req.params.id;

  db.find({_id: id}, function(err, user){
  	res.json(user);
  });
});

router.put('/:id', function(req, res, next) {
  var db = req.app.db.model.User;
  var id = req.params.id;
  var phone = req.body.phone;//body parser 符合json格式

  db
  .update({_id: id}, { $set: {Phone: phone} } )
  .exec(function(err, nModified){
  	res.send({status: "ok"});
  });
});

router.delete('/:id', function(req, res, next) {
  var db = req.app.db.model.User;
  var id = req.params.id;

  db.remove({_id: id}, function(err, result) {
    res.send(result);
  });  
});

module.exports = router;

var express = require('express');
var router = express.Router();

/**
 * GET /users
 */
router.get('/', function(req, res, next) {
  var db = req.app.db.model.User;

  db.find({}, function(err, users) {
  	res.json(users);
  });
});

/**
 * GET /users/:id
 */
router.get('/:id', function(req, res, next) {
  var db = req.app.db.model.User;

  // See: http://expressjs.com/en/guide/routing.html
  var id = req.params.id;

  db.find({_id: id}, function(err, user) {
  	res.json(user);
  });  
});

/**
 * PUT /users/:id
 */
router.put('/:id', function(req, res, next) {
  var db = req.app.db.model.User;
  var id = req.params.id;
  var phone = req.body.phone;

  db
  .update({_id: id}, { $set: {Phone: phone} })
  .exec(function(err, nModified) {
    res.send({ status: "ok" });
  });
});

/**
 * DELETE /users/:id
 */
router.delete('/:id', function(req, res, next) {
  var db = req.app.db.model.User;
  var id = req.params.id;

  db.remove({_id: id}, function(err, result) {
    res.send(result);
  });  
});

module.exports = router;
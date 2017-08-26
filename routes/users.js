'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.app.db.model.User;
});

router.get('/:id', function(req, res, next) {
  var db = req.app.db.model.User;
});

router.put('/:id', function(req, res, next) {
  var db = req.app.db.model.User;
});

router.delete('/:id', function(req, res, next) {
  var db = req.app.db.model.User;
});

module.exports = router;

var express = require('express');
var router = express.Router();
var config = require('../../config');

/* This GET request has the users oauth token as a query param that we need to save to the db */
router.get('/', function(req, res) {
  var token = req.query.code
  if (!token) {
    throw "No code";
  }
  /* how do we know which user object to update? */
  console.log(token);
  res.redirect('/streams/?code='+token);
});

module.exports = router;

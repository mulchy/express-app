var express = require('express');
var router = express.Router();
var config = require('../../config');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id='+ config.twitch.client_id + '&redirect_uri=' + config.twitch.redirect_uri + '&scope=user_read');
});

module.exports = router;

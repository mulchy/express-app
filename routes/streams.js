var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('request');
//var async = require('async');

function logResponse(err, inc, resp) {
   if(err) {
      console.log(err);
    }
    console.log("AJAX:: recieved resp: " + resp);
};

function requestOauth(code, res) {
  request.post({
    url:'https://api.twitch.tv/kraken/oauth2/token',
    body: {
      client_id : config.twitch.client_id,
      client_secret : config.twitch.client_secret,
      grant_type : 'authorization_code',
      redirect_uri : config.twitch.redirect_uri,
      code : code
    },
    json: true
  }, function(err, inc, resp) {
    logResponse(err, inc, resp);
    getStreams(resp.access_token, res);
  });
};

function getStreams(token, res) {
  request.get({
    url:'https://api.twitch.tv/kraken/streams/followed',
    headers: {'Authorization': 'OAuth ' + token},
    json: true
  }, function(err, inc, resp) {
    logResponse(err, inc, resp);
    renderStream(resp, res);
  });
};

function renderStream(resp, res) {
  console.log('RJM_RESP ' + resp);
  console.log('RJM_RESP_STREAM ' + resp.streams);
  console.log('RJM' + resp['streams']);
  var stream = resp.streams[0];
  console.log(stream);
  var channel_name = stream.channel.display_name;
  res.render('streams', { title: 'Twitch Streams', channel: channel_name, volume: '25' });
}

/* GET streams page. */
router.get('/', function(req, res) {
  var code = req.query.code;
  if (!code) {
    console.log('No code query param provided!');
  }
  requestOauth(code, res);
});

module.exports = router;

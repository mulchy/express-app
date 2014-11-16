var config = {};

config.twitch = {};
config.twitch.client_id = process.env.CLIENT_ID;
config.twitch.client_secret = process.env.CLIENT_SECRET;
config.twitch.redirect_uri = process.env.REDIRCT_URI;

module.exports = config;

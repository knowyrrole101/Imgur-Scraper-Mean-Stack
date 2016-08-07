'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:3000',
  SESSION_SECRET:   'meanApp-secret',

  FACEBOOK_ID:      process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET:  process.env.FACEBOOK_SECRET,

  TWITTER_ID:       process.env.TWITTER_CONSUMER_KEY,
  TWITTER_SECRET:   process.env.TWITTER_CONSUMER_SECRET,

  keys:{
    access: '',
    secret: '',
    bucket: '',
    region: ''
  },
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};

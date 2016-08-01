'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:3000',
  SESSION_SECRET:   'meanApp-secret',

  FACEBOOK_ID:      '976886095701910',
  FACEBOOK_SECRET:  '2e717eeca8ea499f2b60c73e310a9c94',

  TWITTER_ID:       'LAsPTIkGlJbpIdK1y31w0a5Wa',
  TWITTER_SECRET:   'g3KQBquzPJ4MUyZpaW3lC4mmRCEMSrmaQ2umV3jNXGnD5vjCS7',

  keys:{
    access: '',
    secret: '',
    bucket: '',
    region: ''
  },
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};

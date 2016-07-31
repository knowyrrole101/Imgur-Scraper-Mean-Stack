'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the '+name+'environment variable');
  }
  return process.env[name];
}

var all = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 3000,
  seedDB: false,
  secrets: {
    session: 'meanApp-secret'
  },
  userRoles: ['guest', 'user', 'admin'],
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  keys: {
    access: process.env.access,
    secret: process.env.secret,
    bucket: process.env.bucket,
    region: process.env.region
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL: (process.env.DOMAIN||"")+'auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_ID||'id',
    clientSecret: process.env.TWITTER_SECRET||'secret',
    callbackURL: (process.env.DOMAIN||"") +'/auth/twitter/callback'
  }
};

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

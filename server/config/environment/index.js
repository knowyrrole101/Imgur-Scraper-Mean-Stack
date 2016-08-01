'use strict';

var path = require('path');
var _ = require('lodash');
var settings = require('./local.env');

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
    clientID: settings.FACEBOOK_ID || 'id',
    clientSecret: settings.FACEBOOK_SECRET || 'secret',
    callbackURL: 'auth/facebook/callback'
    // callbackURL: (process.env.DOMAIN||"")+'auth/facebook/callback'
  },
  twitter: {
    clientID: settings.TWITTER_ID||'id',
    clientSecret: settings.TWITTER_SECRET||'secret',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
    //callbackURL: (process.env.DOMAIN||"") +'/auth/twitter/callback'
  }
};

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

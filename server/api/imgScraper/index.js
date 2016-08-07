'use strict'

var controller = require('./imgScraper.controller');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.post('/scrape', auth.isAuthenticated(), controller.scrape);

module.exports = router;

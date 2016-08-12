'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scrapers = {};

scrapers['pinterest'] = require('./scrapers/pinterest.js');
scrapers['imgur'] = require('./scrapers/imgur.js');

exports.scrape = function (req, res) {
  var url = req.body.url;
  var scraperToUse;

  if(url.indexOf('pinterest') > -1) {
    scraperToUse = 'pinterest';
  } else {
    console.log('cannot locate scraper!');
  }
  if(url.indexOf('imgur') > -1) {
    scraperToUse = 'imgur';
  } else {
    console.log('cannot locate scraper!');
  }

  if(url){
    scrapers[scraperToUse].list(url, function(data) {
      console.log('Data from scraper:', data);
      res.json(data);
    });
  }

}

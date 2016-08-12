'use strict';

var fs= require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, callback) {
  request(url, function(err, res, body) {
    if(err) {
      callback({
        error: error
      });
    }
    if(!err){
      var $ = cheerio.load(body);
      var pin = {};
      var $url = url;
      var $img = $('.post-image img').attr('src');
      var $desc = $('.post-title-container h1').text();
      console.log($img + ' image url');

      var image = {
        img:"http:" + $img,
        url: $url,
        desc: $desc
      };
      //callback data
      console.log('scraped: ', image);
      callback(image);
    }
  })
}

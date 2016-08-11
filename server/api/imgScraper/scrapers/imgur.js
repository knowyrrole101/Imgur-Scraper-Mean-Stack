'use strict';

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
      console.log($img + ' pin url');

      var pin = {
        img:'http:' + $img,
        url: $url,
        desc: $desc
      };
      //callback data
      callback(pin);
    }
  })
}

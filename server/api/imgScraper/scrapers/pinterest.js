'use strict';

var fs = require('fs');
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
      var $img = $('.heightContainer img').attr('src');
      var $desc = $('.heightContainer img').attr('alt');
      console.log($img + 'pin url');

      var pin = {
        img: $img,
        url: $url,
        desc: $desc
      };
      //callback data
      callback(pin);
    }
  })
}

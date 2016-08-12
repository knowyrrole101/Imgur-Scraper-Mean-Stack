'use strict';

var _ = require('lodash');
var Look = require('./look.model');
var path = require('path');
var utils = require('../../utils/utils.js');

exports.scrapeUpload = function(req, res) {
  var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  utils.downloadURI(req.body.image, '../client/assets/images/uploads/'+
    random + '.png', function(filename) {
      console.log('done');
      var newLook = new Look();
      newLook.title = req.body.title;
      newLook.email = req.body.email;
      newLook.linkURL = req.body.linkURL;
      newLook.description = req.body.description;
      newLook.userName = req.body.userName;
      newLook.creator = req.body.creator;
      newLook.createTime = Date.now();
      newLook.upVotes = 0;
      newLook.image = filename.slice(9);
      newLook.save(function (err,item) {
        if(err) {
          console.log("Error saving Image!");
        } else {
          console.log("Success! Post Saved");
          console.log(item);
          res.status(200)
           .json(item);
        }
      })
    }
  );
};

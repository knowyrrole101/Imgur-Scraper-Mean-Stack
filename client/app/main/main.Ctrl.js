(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'looksAPI','$http', 'scrapeAPI', '$alert', 'Upload'];

  function MainCtrl($scope, $state, Auth, $modal, looksAPI, $http, scrapeAPI, $alert, Upload) {
    $scope.user = Auth.getCurrentUser();

    $scope.look = {};
    $scope.looks =[];
    $scope.scrapePostForm = true;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false;

    $scope.picPreview = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;

    var alertSuccess = $alert({
      title: "Success!",
      content: "New Look Added!",
      placement: "top-right",
      container: "#alertContainer",
      type: "success",
      duration: 8
    });

    var alertFail = $alert({
      title: "Not Successfully saved!",
      content: "New Look Not Added",
      placement: 'top-right',
      container: "#alertContainer",
      type: "alert",
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    };

    $scope.showUploadForm = function() {
      $scope.uploadLookForm = true;
      $scope.scrapePostForm = false;
      $scope.uploadLookTitle = false;
    }

    looksAPI.getAllLooks()
      .then(function(data){
        console.log(data);
        $scope.looks = data.data;
      })
      .catch(function(err) {
        console.log("Failed to get looks " + err)
      });

    $scope.$watch('look.link', function(newVal, oldVal) {
      if(newVal!==oldVal){
        if(newVal.length > 5) {
          $scope.loading = true;
          var link = {
            url: $scope.look.link
          }
          scrapeAPI.getScrapeDetails(link)
          .then(function (data) {
            console.log(data);
            $scope.showScrapeDetails = true;
            $scope.gotScrapeResults = true;
            $scope.uploadLookTitle = false;
            $scope.look.imgThumb = data.data.img;
            $scope.look.description = data.data.desc;
          })
          .catch(function (data) {
            console.log('failed to return from scrape');
            $scope.loading = false;
            $scope.look.link = '';
            $scope.gotScrapeResults = false;
          })
          .finally(function () {
            $scope.loading = false;
            $scope.uploadLookForm = false;
          })
        };
      };
    });
    $scope.addScrapePost = function() {
      console.log($scope.user);
      var look = {
        description: $scope.look.description,
        title: $scope.look.title,
        image: $scope.look.imgThumb,
        link: $scope.look.link,
        email: $scope.user.email,
        name: $scope.user.name,
        _creator: $scope.user._id
      };
      looksAPI.createScrapeLook(look)
        .then(function(data) {
          alertSuccess.show();
          $scope.showScrapeDetails = false;
          $scope.gotScrapeResults = false;
          $scope.look.link = "";
          $scope.look.title = "";
          $scope.looks.splice(0,0,data.data);
          console.log(data);
        })
        .catch(function () {
          console.log("Failed to post");
          alertFail.show();
          $scope.showScrapeDetails = false;
        });
    };

    $scope.uploadPic = function(file) {
      Upload.upload({
        url: 'api/look/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
          title: $scope.look.title,
          description: $scope.look.description,
          email: $scope.user.email,
          name: $scope.user.name,
          linkURL: $scope.look._id,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        $scope.looks.splice(0, 0, resp.data);
        $scope.look.title = '';
        $scope.look.description = '';
        $scope.picFile = '';
        $scope.picPreview = false;
        alertSuccess.show();
      }, function(resp) {
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

      });
    }
  }
})();

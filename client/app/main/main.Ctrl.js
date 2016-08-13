(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'looksAPI','$http', 'scrapeAPI', '$alert'];

  function MainCtrl($scope, $state, Auth, $modal, looksAPI, $http, scrapeAPI) {
    $scope.user = Auth.getCurrentUser();
    $scope.look = {};
    $scope.scrapePostForm = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false;

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    };

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
      var look = {
        description: $scope.look.description,
        title: $scope.look.title,
        image: $scope.look.imgThumb,
        link: $scope.look.link,
        email: $scope.user.email,
        name: $scope.user.name,
        creator: $scope.user._id
      };
      looksAPI.createScrapeLook(look)
        .then(function(data) {
          $scope.showScrapeDetails = false;
          $scope.gotScrapeResults = false;
          $scope.look.link = "";
          $scope.look.title = "";
          console.log(data);
        })
        .catch(function () {
          console.log("Failed to post");
          $scope.showScrapeDetails = false;
        });
    };
  };
})();

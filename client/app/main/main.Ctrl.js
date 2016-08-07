(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', '$http'];

  function MainCtrl($scope, $state, Auth, $modal, $http) {
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
      if(newVal.length > 5) {
        $scope.loading = true;
      }
      $http.post('/api/links/scrape', {
        url: $scope.look.link
      })
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
    });

  }
})();

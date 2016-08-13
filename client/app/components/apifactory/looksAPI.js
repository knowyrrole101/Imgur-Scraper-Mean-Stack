(function() {
  'use strict';

  angular
    .module('app')
    .factory('looksAPI', looksAPI);

    looksAPI.$inject = ['$http'];

    function looksAPI($http) {
      return {
        createScrapeLook: createScrapeLook
      }

      function createScrapeLook(look) {
        return $http.post('/api/look/scrapeUpload', look)
      }
    }



})();

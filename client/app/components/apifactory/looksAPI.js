(function() {
  'use strict';

  angular
    .module('app')
    .factory('looksAPI', looksAPI);

    looksAPI.$inject = ['$http'];

    function looksAPI($http) {
      return {
        createScrapeLook: createScrapeLook,
        getAllLooks: getAllLooks
      }

      function createScrapeLook(look) {
        return $http.post('/api/look/scrapeUpload', look)
      }

      function getAllLooks() {
        return $http.get('/api/look/getAllLooks', {
          cache: true
        });
      }

    }



})();

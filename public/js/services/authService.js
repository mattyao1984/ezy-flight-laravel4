'use strict';

angular.module('services')
.factory('authService', ['$http','$q', function($http, $q) {
	return {
		postLogin: function(username, password){
      var req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        url: '/login',
        data: {
          'email': username,
          'password': password
        }
      };

			var promise = $http(req).success(function(data, status, headers, config) {
        return data;
      });

      return promise;
		}
	}
}]);
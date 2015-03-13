'use strict';

angular.module('services')
.factory('authService', ['$http','$q', function($http, $q) {
	var myConfig;
	var env = 'staging';

	return {
		setConfig: function(_data){
      this.myConfig = _data;
    },

    getConfig: function(){
        return this.myConfig;
    },

		getLogin: function(username, password){
			var PARSE_HEADER = {
        'Content-Type': 'application/json'
      };

      PARSE_HEADER = $.extend(PARSE_HEADER, this.myConfig.settings[env].header);

      var query = 'username=' + username + '&password=' + password;

      var req = {
        method: 'GET',
        headers: PARSE_HEADER,
        url: this.myConfig.login_url + encodeURI(query)
      };

			var promise = $http(req).success(function(data, status, headers, config) {
        return data;
      });

      return promise;
		}
	}
}]);
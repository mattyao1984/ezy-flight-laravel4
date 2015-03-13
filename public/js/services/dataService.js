'use strict';

angular.module('services', [])
.factory('dataService', ['$http','$q', function($http, $q) {
	var myConfig;
	var env = 'staging';

	return {
		setConfig: function(_data){
      this.myConfig = _data;
    },

    getConfig: function(){
        return this.myConfig;
    },

		getServerConfig: function(){
      var promise = $http({ method: 'GET', url: 'scripts/models/config.json' }).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    },

    getMyBookings: function(userId){
    	var PARSE_HEADER = {
        'Content-Type': 'application/json'
      };

      PARSE_HEADER = $.extend(PARSE_HEADER, this.myConfig.settings[env].header);

      var query = 'where=' + JSON.stringify({
      	'userId': userId
      });
      var req = {
          method: 'GET',
          headers: PARSE_HEADER,
          url: this.myConfig.base_url + '/Bookings?' + query + '&limit=1000'
      };

      var promise = $http(req).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    },

    postAddFlight: function(bookingJSON){
    	var PARSE_HEADER = {
          'Content-Type': 'application/json'
      };

      PARSE_HEADER = $.extend(PARSE_HEADER, this.myConfig.settings[env].header);

      var req = {
          method: 'POST',
          headers: PARSE_HEADER,
          url: this.myConfig.base_url + '/Bookings',
          data: bookingJSON
      };

      var promise = $http(req).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    },

    putEditFlight: function(bookingJSON, objectId){
      var PARSE_HEADER = {
          'Content-Type': 'application/json'
      };

      PARSE_HEADER = $.extend(PARSE_HEADER, this.myConfig.settings[env].header);

      var req = {
          method: 'PUT',
          headers: PARSE_HEADER,
          url: this.myConfig.base_url + '/Bookings/' + objectId,
          data: bookingJSON
      };

      var promise = $http(req).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    },

    deleteBooking: function(objectId){
    	var PARSE_HEADER = {
          'Content-Type': 'application/json'
      };

      PARSE_HEADER = $.extend(PARSE_HEADER, this.myConfig.settings[env].header);

      var req = {
          method: 'DELETE',
          headers: PARSE_HEADER,
          url: this.myConfig.base_url + '/Bookings/' + objectId
      };

      var promise = $http(req).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    }
	}
}]);
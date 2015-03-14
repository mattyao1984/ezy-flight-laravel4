'use strict';

angular.module('services', [])
.factory('dataService', function($resource) {
	/*return {
    getMyBookings: function(userId){
      var req = {
          method: 'GET',
          url: '/booking/' + userId
      };

      var promise = $http(req).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    },

    postAddFlight: function(bookingJSON){
      var req = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          url: '/booking',
          data: bookingJSON
      };

      var promise = $http(req).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    },

    putEditFlight: function(bookingJSON, id){
      var req = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          url: '/booking/' + id,
          data: bookingJSON
      };

      var promise = $http(req).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    },

    deleteBooking: function(id){
      var req = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          url: '/bookings/' + id
      };

      var promise = $http(req).success(function(data, status, headers, config) {
          return data;
      });

      return promise;
    }
	}*/

  return $resource('/booking/:id', {id: '@id'}, {
    search: {
      method:'GET', 
      params:{
        id: '@id'
      }, 
      isArray:true
    },

    create: {
      method:'POST'
    },

    update: {
      method:'PUT', 
      params:{
        id: '@id'
      }
    },

    remove: {
      method: 'DELETE',
      params: {
        id: '@id'
      }
    }
  });
});
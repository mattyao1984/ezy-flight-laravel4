'use strict';

angular.module('services', [])
.factory('dataService', function($resource) {
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
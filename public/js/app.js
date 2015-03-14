'use strict';

/**
 * @ngdoc overview
 * @name ezyFlightApp
 * @description
 * # ezyFlightApp
 *
 * Main module of the application.
 */
angular
  .module('ezyFlightApp', [
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'directives',
    'controllers',
    'services',
    'angular-datepicker'
  ])
  .config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });



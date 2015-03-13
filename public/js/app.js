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
    'ngSanitize',
    'directives',
    'controllers',
    'services',
    'angular-datepicker'
  ])
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
  });



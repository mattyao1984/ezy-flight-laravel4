'use strict';

describe('Controller: homeController', function () {

  // load the controller's module
  beforeEach(module('ezyFlightApp'));

  var homeController, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;

    homeController = $controller('homeController', {
      $scope: scope
    });
  }));

  describe('Initialize values', function() {
    it('should init with correct values', function () {
      expect(scope.dataLoading).toBe(false);
      expect(scope.errorMessage).toBe('');
    });
  });

  describe('Login event', function() {
    beforeEach(function() {
      scope.username = 'test';
      scope.password = 'test';
    });

    it('should have an error access is not valid', function () {
      $httpBackend.expectPOST('/login', {
        email : scope.username,
        password : scope.password
      })
      .respond({
        'code': '0',
        'info': 'Username/Password is not correct.',
        'error': 'error'
      });
      scope.login();
      expect(scope.dataLoading).toBe(true);

      $httpBackend.flush();

      expect(scope.dataLoading).toBe(false);
      expect(scope.errorMessage).toBe('Username/Password is not correct.');
    });
  });
});

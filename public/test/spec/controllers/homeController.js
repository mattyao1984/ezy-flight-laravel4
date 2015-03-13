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
      $httpBackend.expectGET('scripts/models/config.json')
      .respond({
        login_url: 'https://api.parse.com/1/login?',
        based_url: 'https://api.parse.com/1/classes',
        settings: {
          staging: {
            header: {
              'X-Parse-Application-Id': 'xxx',
              'X-Parse-REST-API-Key': 'xxx'
            }
          }
        }
      });

      $httpBackend.flush();

      scope.username = 'test';
      scope.password = 'test';
    });

    it('should have no error if access is succssful', function () {
      var query = 'username=' + scope.username + '&password=' + scope.password;
      $httpBackend.expectGET('https://api.parse.com/1/login?' + encodeURI(query))
      .respond({
        'objectId': 'testID'
      });
      scope.login();
      expect(scope.dataLoading).toBe(true);

      $httpBackend.flush();

      expect(scope.dataLoading).toBe(false);
      expect(scope.errorMessage).toBe('');
    });
  });
});

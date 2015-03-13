'use strict';

describe('Controller: bookingsController', function () {

  // load the controller's module
  beforeEach(module('ezyFlightApp'));

  var bookingsController, scope, $httpBackend, route = {};

  route.current = {
    params: {
      'userId': 'testID'
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, $route) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    bookingsController = $controller('bookingsController', {
      $scope: scope,
      $route: route
    });
  }));

  describe('Initialize values', function() {
    it('should init with correct values', function () { 
      expect(scope.userId).toBe('testID'); 
      expect(scope.dataReady).toBe(false);
      expect(scope.showModal).toBe(false);
      expect(scope.allBookings.length).toBe(0);
      expect(scope.submitted).toBe(false);
    });
  });

  describe('when addFlight button is clicked', function() {
    it('should show the modal and init the booking object', function () { 
      scope.addFlight();
      expect(scope.showModal).toBe(true);
      expect(scope.booking).not.toBeUndefined();
    });
  });

  describe('when cancel button is clicked', function() {
    it('should hide the modal', function () { 
      scope.cancelBooking();
      expect(scope.showModal).toBe(false);
      expect(scope.submitted).toBe(false);
    });
  });

  describe('test isNumberic()', function() {
    it('should return false if the value is not a number', function () { 
      expect(scope.isNumeric('abc')).toBe(false);
      expect(scope.isNumeric('%^%')).toBe(false);
      expect(scope.isNumeric('1@$')).toBe(false);
    });
  });

  describe('Testing sorting functions', function() {
    beforeEach(function() {
      scope.allBookings = [{
        capacity: 3,
        date: "17 April, 2015",
        destination: "Perth",
        objectId: "EpQIO7bpFt",
        source: "Bei Jing",
        time: "3:30 AM",
        userId: "02lGbbUkNQ"
      },{
        capacity: 1,
        date: "22 May, 2015",
        destination: "B2Cloud",
        objectId: "WG4vKlJe8n",
        source: "Adelaide",
        time: "1:30 AM",
        userId: "02lGbbUkNQ"
      },{
        capacity: 2,
        date: "10 March, 2015",
        destination: "Perth",
        objectId: "30juPV66xr",
        source: "Sydney",
        time: "8:00 PM",
        userId: "02lGbbUkNQ"
      }];
    });

    it('should sort by capacity', function () {
      scope.filter = 'Capacity';
      scope.sortBookings();
      expect(scope.allBookings[0].capacity).toBe(3);
    });

    it('should sort by source', function () {
      scope.filter = 'Source';
      scope.sortBookings();
      expect(scope.allBookings[0].source).toBe('Adelaide');
    });

    it('should sort by destination', function () {
      scope.filter = 'Destination';
      scope.sortBookings();
      expect(scope.allBookings[0].destination).toBe('B2Cloud');
    });

    it('should sort by datetime', function () {
      scope.filter = 'Datetime';
      scope.sortBookings();
      expect(scope.allBookings[0].date).toBe('22 May, 2015');
    });
  });
});

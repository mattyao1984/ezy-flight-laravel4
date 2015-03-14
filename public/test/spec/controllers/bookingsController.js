'use strict';

describe('Controller: bookingsController', function () {

  // load the controller's module
  beforeEach(module('ezyFlightApp'));

  var bookingsController, scope, $httpBackend, route = {}, $window;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, $route, _$window_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $window = _$window_;
    bookingsController = $controller('bookingsController', {
      $scope: scope
    });
  }));

  describe('Initialize values', function() {
    it('should init with correct values', function () { 
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

  describe('test isPostiveNum(n)', function() {
    it('should return false if the value is not a number', function () { 
      expect(scope.isPostiveNum('abc')).toBe(false);
      expect(scope.isPostiveNum('%^%')).toBe(false);
      expect(scope.isPostiveNum('1@$')).toBe(false);
      expect(scope.isPostiveNum('-2')).toBe(false);
      expect(scope.isPostiveNum('999')).toBe(true);
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

  describe('If the new booking entry is valid', function() {
    beforeEach(function() {
      scope.allBookings = [];
      scope.booking = {
        capacity: 2,
        date: "10 March, 2015",
        destination: "Perth",
        source: "Sydney",
        time: "8:00 PM",
        userId: "1"
      };
      scope.bookingForm.bookingForm = {
        $invalid: false
      };

    });

    it('should add a new booking to the list', function () { 
      $httpBackend.expectPOST('/booking', scope.booking)
      .respond({
        'code': '200',
        'info':'New booking has been created.',
        'id': 99
      });
      scope.saveBooking();
      $httpBackend.flush();

      expect(scope.allBookings.length).toBe(1);
    });
  });

  describe('If delete the booking', function() {
    beforeEach(function() {
      scope.allBookings = [{
        capacity: 2,
        date: "10 March, 2015",
        destination: "Perth",
        source: "Sydney",
        time: "8:00 PM",
        userId: "1",
        id: 22
      }];

      spyOn($window, 'confirm').and.returnValue(true);
    });

    it('should update the length of allBookings list', function () { 
      $httpBackend.expectDELETE('/booking/22')
      .respond({
        'code': '200',
        'info':'Booking has been deleted.'
      });

      scope.removeBooking(22);
      $httpBackend.flush();

      expect(scope.allBookings.length).toBe(0);
    });
  });
});

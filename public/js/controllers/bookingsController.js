'use strict';

angular.module('controllers')
.controller('bookingsController', ['$rootScope', '$scope', '$route', '$location', 'dataService', function($rootScope, $scope, $route, $location, dataService) {
	$scope.userId = $route.current.params.userId;
	$scope.showModal = false;
	$scope.dataReady = false;
	$scope.allBookings = [];
	$scope.bookingForm = {};

	$scope.submitted = false;
	$scope.filter = 'all';

	//Get and set config settings 
	dataService.getServerConfig().then(function(server_res){
		dataService.setConfig(server_res.data);
		$scope.syncData();
	});

	$scope.addFlight = function(){
		$scope.showModal = true;
		$scope.booking = {};
	};

	$scope.editFlight = function(objectId){
		$scope.showModal = true;
		$scope.booking = _.find($scope.allBookings, function(b){
			return b.objectId === objectId;
		});
	};

	$scope.cancelBooking = function(){
		$scope.showModal = false;
		$scope.submitted = false;
	};

	$scope.logout = function(){
		localStorage.setItem('isLoggedIn' ,false);
		$location.path('/');
	};

	$scope.setFormScope= function(scope){
    $scope.bookingForm = scope;
	}

	$scope.syncData = function(){
		$scope.dataReady = false;
		dataService.getMyBookings($scope.userId).then(function(bookingsRes){
			$scope.allBookings = bookingsRes.data.results;
			$scope.dataReady = true;
		});
	};

	$scope.saveBooking = function(){
		$scope.booking.capacity = parseInt($scope.booking.capacity);

		if($scope.booking.hasOwnProperty('objectId')){
			$scope.submitted = true;
			var data = {
				source: $scope.booking.source,
				destination: $scope.booking.destination,
				date: $scope.booking.date,
				time: $scope.booking.time,
				capacity: $scope.booking.capacity
			};

			if($scope.bookingForm.bookingForm.$invalid == false && $scope.validCapacity()){
				dataService.putEditFlight(data, $scope.booking.objectId).then(function(res){
					$scope.showModal = false;
					$scope.submitted = false;
					$scope.sortBookings();
				});
			}
		}else{
			var data = $.extend($scope.booking, {
				userId: $scope.userId
			});

			$scope.submitted = true;

			if($scope.bookingForm.bookingForm.$invalid == false && $scope.validCapacity()){
				dataService.postAddFlight(data).then(function(res){
					$scope.showModal = false;
					$scope.submitted = false;

					var newId = res.data.objectId;
					$scope.booking = $.extend($scope.booking, {
						objectId: newId
					});

					$scope.allBookings.push($scope.booking); //Update allBookings list
					$scope.sortBookings();
				});
			}
		}
	};

	$scope.isNumeric = function(n){
	  return !isNaN(parseFloat(n)) && isFinite(n);
	};

	$scope.validCapacity = function(){
		if($scope.isNumeric($scope.booking.capacity)){
			return true;
		}else{
			return false;
		}
	};

	$scope.removeBooking = function(objectId){
		var answer = confirm('Are you sure to remove this flight from the system?');
		if(answer){
			dataService.deleteBooking(objectId).then(function(res){
				//remove the booking from the list
				$scope.allBookings = _.without($scope.allBookings, _.findWhere($scope.allBookings, {objectId: objectId}));
			});
		}
	};

	$scope.sortBookings = function(){
		switch($scope.filter){
			case 'Capacity':
				$scope.allBookings = _.sortBy($scope.allBookings, function(p){
          return -p.capacity;
        });
				break;
			case 'Source':
				$scope.allBookings = _.sortBy($scope.allBookings, function(p){
          return p.source;
        });
				break;
			case 'Datetime':
				$scope.allBookings = _.sortBy($scope.allBookings, function(p){
          return -moment(p.date + ' ' + p.time);
        });
				break;
				break;
			case 'Destination':
				$scope.allBookings = _.sortBy($scope.allBookings, function(p){
          return p.destination;
        });
				break;
		}
	};
}]);
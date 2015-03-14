'use strict';

angular.module('controllers')
.controller('bookingsController', ['$scope', '$location', 'dataService', 'authService', function($scope, $location, dataService, authService) {
	$scope.showModal = false;
	$scope.dataReady = false;
	$scope.allBookings = [];
	$scope.bookingForm = {};

	$scope.submitted = false;
	$scope.filter = 'all';
	
	setTimeout(function(){
		/*dataService.getMyBookings($scope.userId).then(function(bookingsRes){
			$scope.allBookings = bookingsRes.data;
			$scope.dataReady = true;
		});*/

		$scope.allBookings = dataService.search({
			id: $scope.userId
		});

		$scope.allBookings.$promise.then(function(bookingsRes){
			$scope.allBookings = bookingsRes;
			$scope.dataReady = true;
			$scope.sortBookings();
		});
	},50);
	
	$scope.addFlight = function(){
		$scope.showModal = true;
		$scope.booking = {};
	};

	$scope.editFlight = function(id){
		$scope.showModal = true;
		$scope.booking = _.find($scope.allBookings, function(b){
			return b.id === id;
		});
	};

	$scope.cancelBooking = function(){
		$scope.showModal = false;
		$scope.submitted = false;
	};

	$scope.logout = function(){
		authService.getSignOut().then(function(res){
			window.location = '/';
		});
	};

	$scope.setFormScope= function(scope){
    $scope.bookingForm = scope;
	}

	$scope.syncData = function(){
		$scope.dataReady = false;
		/*dataService.getMyBookings($scope.userId).then(function(bookingsRes){
			$scope.allBookings = bookingsRes.data;
			$scope.dataReady = true;
			$scope.sortBookings();
		});*/

		$scope.allBookings = dataService.search({
			id: $scope.userId
		});

		$scope.allBookings.$promise.then(function(bookingsRes){
			$scope.allBookings = bookingsRes;
			$scope.dataReady = true;
			$scope.sortBookings();
		});
	};

	$scope.saveBooking = function(){
		$scope.booking.capacity = parseInt($scope.booking.capacity);

		if($scope.booking.hasOwnProperty('id')){
			$scope.submitted = true;
			var data = {
				source: $scope.booking.source,
				destination: $scope.booking.destination,
				date: $scope.booking.date,
				time: $scope.booking.time,
				capacity: $scope.booking.capacity
			};

			if($scope.bookingForm.bookingForm.$invalid == false && $scope.validCapacity()){
				/*dataService.putEditFlight(data, $scope.booking.id).then(function(res){
					$scope.showModal = false;
					$scope.submitted = false;
					$scope.sortBookings();
				});*/

				dataService.update(data, {id: $scope.booking.id}, function(res){
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
				/*dataService.postAddFlight(data).then(function(res){
					$scope.showModal = false;
					$scope.submitted = false;

					var newId = res.data.id;
					$scope.booking = $.extend($scope.booking, {
						id: newId
					});

					$scope.allBookings.unshift($scope.booking); //Update allBookings list
					$scope.sortBookings();
				});*/

				dataService.create(data, function(res){
					$scope.showModal = false;
					$scope.submitted = false;

					var newId = res.id;
					$scope.booking = $.extend($scope.booking, {
						id: newId
					});

					$scope.allBookings.unshift($scope.booking); //Update allBookings list
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

	$scope.removeBooking = function(id){
		var answer = confirm('Are you sure to remove this flight from the system?');
		if(answer){
			/*dataService.deleteBooking(id).then(function(res){
				//remove the booking from the list
				$scope.allBookings = _.without($scope.allBookings, _.findWhere($scope.allBookings, {id: id}));
			});*/
			dataService.remove({id: id}, function(){
				$scope.allBookings = _.without($scope.allBookings, _.findWhere($scope.allBookings, {id: id}));
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
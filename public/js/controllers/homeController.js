'use strict';

angular.module('controllers', [])
.controller('homeController', ['$rootScope', '$scope', '$location', 'dataService', 'authService', function($rootScope, $scope, $location, dataService, authService) {
	$scope.errorMessage = '';
	$scope.dataLoading = false;

	$scope.login = function(){
		$scope.dataLoading = true;
		authService.postLogin($scope.username, $scope.password).then(function(res){
			$scope.dataLoading = false;
			if(res.data.code === '0'){
				$scope.errorMessage = res.data.info;
			}else{
				$scope.errorMessage = '';
				window.location = '/bookings/' + res.data.id;
			}
		}, function(error){
			$scope.dataLoading = false;
			$scope.errorMessage = 'Login error.';
		});
	};
}]);
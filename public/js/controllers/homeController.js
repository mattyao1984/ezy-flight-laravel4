'use strict';

angular.module('controllers', [])
.controller('homeController', ['$rootScope', '$scope', '$location', 'dataService', 'authService', function($rootScope, $scope, $location, dataService, authService) {
	$scope.errorMessage = '';
	$scope.dataLoading = false;

	$scope.login = function(){
		$scope.dataLoading = true;
		authService.getLogin($scope.username, $scope.password).then(function(res){
			$scope.errorMessage = '';
			$scope.dataLoading = false;
		}, function(error){
			$scope.dataLoading = false;
			$scope.errorMessage = 'Username/Password is not correct';
		});
	};
}]);
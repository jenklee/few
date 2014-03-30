'use strict';

/* Controllers */

angular.module('few.controllers', []).
  controller('MainCtrl', ["$scope", "$http", '$location', '$timeout', function($scope, $http, $location, $timeout) {
		
		$scope.showPage = false;
		$scope.$on("event:navto", function(event, path) {
			$scope.navtopath(path);
		});
		
		
		$scope.navtopath = function(path) {
			if(path === '/' && $scope.showPage){
				$scope.showPage = false;
				$location.path(path);
			}
			else if(!$scope.showPage) {
				$scope.showPage = true;
				$timeout(function(){
					$location.path(path);
				},
				900);
			}
			else{
				$scope.showPage = true;
				$location.path(path);
			}
		}
		
		$http.get('api/members').
		      success(function(data, status) {
		        $scope.status = status;
		        $scope.data = data;
				$scope.$emit("event:addmemberpins", data);
				console.log($location.hash());
		      }).
		      error(function(data, status) {
		        $scope.data = data || "Request failed";
		        $scope.status = status;
		    });
				
	}])
  .controller('ParticipateCtrl', ["$scope", "$http", '$location', function($scope, $http, $location) {
	$scope.member = {	
	}
	
	$scope.add = function(member) {

		var member = angular.copy(member);
		var location = {
			lat: member.place.geometry.location.lat(),
			lng: member.place.geometry.location.lng()
		}
		
		angular.extend(member.place.geometry.location, location);
		
		console.log("Adding ", member);
				
		$http.post('/api/addmember', member).
		      success(function(data, status) {			
				$scope.$emit("event:newmemberadded", data);
				$scope.$emit("event:navto", '/');
		      }).
		      error(function(data, status) {
				console.log('Adding new member failed', data, status);
		
		    });
	}
	
  }])
  .controller('StatisticsCtrl', ["$scope", function($scope) {
  }])
  .controller('EventsCtrl', ["$scope", function($scope) {
  }])
  .controller('PrincipalsCtrl', ["$scope", function($scope) {
  }])
  .controller('MissionCtrl', ["$scope", function($scope) {
  }])
  .controller('ConnectCtrl', ["$scope", function($scope) {
  }]);










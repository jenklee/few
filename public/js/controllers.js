'use strict';

/* Controllers */

angular.module('few.controllers', []).
  controller('MainCtrl', ["$scope", "$rootScope", "$http", "$routeParams", "$location", "$timeout", "$log",  function($scope, $rootScope, $http, $routeParams, $location, $timeout, $log) {
		
		function endsWith(str, suffix) {
		    return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}
		
		$scope.showPage = false;
		$scope.$on("event:navto", function(event, path) {
			$scope.navtopath(path);
		});
		
		$rootScope.$on("$locationChangeStart", function(event, next, current) {
			if(next && (endsWith(next, 'participate')
							|| endsWith(next, 'mission') 
							|| endsWith(next, 'statistics') 
							|| endsWith(next, 'blog') 
							|| endsWith(next, 'events') 
							|| endsWith(next, 'principals') 
							|| endsWith(next, 'connect') ))
			{
				$scope.showPage = true;
			}
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
				1000);
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
				//http://localhost:3000/?pin=53377f645667c1bb0909d971
				var search = $location.search();
				$scope.$emit("event:addmemberpins", data, search.pin);
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
  .controller('MissionCtrl', ["$scope", function($scope) {
  }])
  .controller('StatisticsCtrl', ["$scope", function($scope) {
  }])
  .controller('BlogCtrl', ["$scope", function($scope) {
  }])
  .controller('EventsCtrl', ["$scope", function($scope) {
  }])
  .controller('PrincipalsCtrl', ["$scope", function($scope) {
  }])
  .controller('ConnectCtrl', ["$scope", function($scope) {
  }]);










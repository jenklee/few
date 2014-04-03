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
	$scope.member;
	$scope.showFormErrors = false;
	$scope.invalidPlace = false;
	$scope.serverError = false;
	$scope.serverErrorMsg = "";
	
	$scope.add = function(member) {
				
		$scope.showFormErrors = false;
		$scope.invalidPlace = false;
		$scope.serverError = false;
		
		if($scope.memberform.$valid) {
			
			var member = angular.copy(member);
			
			if(!(member.place.hasOwnProperty("geometry"))) {
				$scope.invalidPlace = true;
				return;
			}
			
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
					$scope.showFormErrors = true;
					$scope.serverError = false;
					if(data.length > 0){
						$scope.serverErrorMsg = data;
					}
					else {
						$scope.serverErrorMsg = "Sorry, our server is having issues. Please try again later.";
					}

			    });
			
		}
		else {
			$scope.showFormErrors = true;
			if( !( member && member.hasOwnProperty("place") && member.place.hasOwnProperty("geometry") ) ) {
				$scope.invalidPlace = true;
			}
		}

	}
	
  }])
  .controller('MissionCtrl', ["$scope", function($scope) {
  }])
  .controller('StatisticsCtrl', ["$scope", "$http", function($scope, $http) {
		
		$scope.cities = [];
		$scope.countries = [];
		$scope.members;
		$scope.founders;
		
		$scope.showCountries = false;
		
		$http.get('/api/stats/members').
		      success(function(data, status) {
				$scope.members = data;
		      }).
		      error(function(data, status) {
				$scope.showFormErrors = true;
				$scope.serverError = false;
				if(data.length > 0){
					$scope.serverErrorMsg = data;
				}
				else {
					$scope.serverErrorMsg = "Sorry, our server is having issues. Please try again later.";
				}

		    });
		
		$http.get('/api/stats/founders').
		      success(function(data, status) {
				$scope.founders = data;
		      }).
		      error(function(data, status) {
				$scope.showFormErrors = true;
				$scope.serverError = false;
				if(data.length > 0){
					$scope.serverErrorMsg = data;
				}
				else {
					$scope.serverErrorMsg = "Sorry, our server is having issues. Please try again later.";
				}

		    });
		
		$http.get('/api/stats/country').
		      success(function(data, status) {
				$scope.countries = data[0].long_name;
		      }).
		      error(function(data, status) {
				$scope.showFormErrors = true;
				$scope.serverError = false;
				if(data.length > 0){
					$scope.serverErrorMsg = data;
				}
				else {
					$scope.serverErrorMsg = "Sorry, our server is having issues. Please try again later.";
				}

		    });
	
		$http.get('/api/stats/city').
		      success(function(data, status) {
			
				if(angular.isArray(data) ){
					angular.forEach(data, function(city, idx){
						if(city.hasOwnProperty('_id') && city._id.hasOwnProperty('long_name')) {
					      $scope.cities.push(city);
												
						}
					});
				}

		      }).
		      error(function(data, status) {
				$scope.showFormErrors = true;
				$scope.serverError = false;
				if(data.length > 0){
					$scope.serverErrorMsg = data;
				}
				else {
					$scope.serverErrorMsg = "Sorry, our server is having issues. Please try again later.";
				}

		    });
	
	
  }])
  .controller('BlogCtrl', ["$scope", function($scope) {
  }])
  .controller('EventsCtrl', ["$scope", function($scope) {
  }])
  .controller('PrincipalsCtrl', ["$scope", function($scope) {
  }])
  .controller('ConnectCtrl', ["$scope", function($scope) {
  }]);










'use strict';

/* Filters */

angular.module('few.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
.filter('countryTotal', [function() {
  return function(countries) {
	var total = 0;
	if(angular.isArray(countries) ){
		angular.forEach(countries, function(county, idx){
		      total = total + county.count;
		});
	}
    return total;
  };
}])
.filter('cityTotal', [function() {
  return function(cities) {
	var total = 0;
	if(angular.isArray(cities) ){
		angular.forEach(cities, function(city, idx){
		      total = total + city.count;
		});
	}
    return total;
  };
}]);

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
}])
.filter('fromNow', function() {
    return function(dateString) {
        return moment(dateString).fromNow();
    };
})
.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});


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
.filter('participantToUpper', function() {
    return function(participants) {
		
		angular.forEach(participants, function(participant, idx){
			participant.firstname = angular.uppercase(participant.firstname.substring(0,1)) + participant.firstname.substring(1);
			participant.lastname = angular.uppercase(participant.lastname.substring(0,1)) + participant.lastname.substring(1);
		});

        return participants;

    };
});


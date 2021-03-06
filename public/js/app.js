'use strict';


// Declare app level module which depends on filters, and services
angular.module('few', [
  'angular-momentjs',
  'ngRoute',
  'ngAnimate',
  'few.filters',
  'few.services',
  'few.directives',
  'few.controllers'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {controller: 'MainCtrl'});
  $routeProvider.when('/participate', {templateUrl: 'partials/participate.html', controller: 'ParticipateCtrl'});
  $routeProvider.when('/mission', {templateUrl: 'partials/mission.html', controller: 'MissionCtrl'});
  $routeProvider.when('/statistics', {templateUrl: 'partials/statistics.html', controller: 'StatisticsCtrl'});
  $routeProvider.when('/blog', {templateUrl: 'partials/blog.html', controller: 'BlogCtrl'});
  $routeProvider.when('/events', {templateUrl: 'partials/events.html', controller: 'EventsCtrl'});
  $routeProvider.when('/principals', {templateUrl: 'partials/principals.html', controller: 'PrincipalsCtrl'});
  $routeProvider.when('/connect', {templateUrl: 'partials/connect.html', controller: 'ConnectCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]).
config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true);
}]);

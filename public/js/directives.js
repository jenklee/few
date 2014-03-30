'use strict';

/* Directives */


angular.module('few.directives', []).
directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
.directive('googlePlaces', [function(){
	return {
		restric: 'A',
		transclude: true,
		scope: {
		        ngModel: "="
		      },
		link: function(scope, elem, attrs) {
			
			var autocomplete = new google.maps.places.Autocomplete((elem[0]), { types: ['geocode'] });

			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				scope.$apply(function(){
					scope.ngModel = autocomplete.getPlace();
				});
			});
		
		}
	}
}])
.directive('googleMap', [function () {
	return {
		restrict: 'A',
		transclude: true,
		link: function (scope, elem, attrs) {
			
		    var defaultLatlng = new google.maps.LatLng(0, 0);
		    var mapOptions = {
		        zoom: 2,
		        center: defaultLatlng,
		        scrollwheel: false,
		        disableDoubleClickZoom: true,
		        keyboardShortcuts: false,
		        mapMaker: false,
		        rotateControl: false,
		        panControl: false,
		        navigationControl: false,
		        mapTypeControl: false,
		        scaleControl: false,
		        streetViewControl: false,
		        zoomControl: false,
		        draggable: false,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    };

    		scope.map = new google.maps.Map(elem[0], mapOptions);
			
			scope.addPinForMember = function(member) {
				var currentLocation = new google.maps.LatLng(member.place.geometry.location.lat, member.place.geometry.location.lng);
				var marker = new google.maps.Marker({
	                position: currentLocation,
	                map: scope.map,
	                title: member.firstname
	            });

				var info = '<div class="info">'+
								"<div>" + member.firstname + " " + member.lastname + "</div>" +
								"<div>" + member.place.vicinity + "</div>" +
								"<div>" + '<a href="' + member.companyurl + '" rel="nofollow">'
								+ member.companyname + "</a></div>" +
								// "<div>" + Share + "</div>" +
								"<div>" + member.companydescription + "</div>" +
								"<div>" + member.role + "</div>" +
				      		'</div>';
				
				var coordInfoWindow = new google.maps.InfoWindow({
							      content: info
							  });
				// coordInfoWindow.open(scope.map,marker);
				var markerMouseoutListener = google.maps.event.addListener(marker, 'mouseout', function() {
			    	coordInfoWindow.close(scope.map, marker);
				});
				
				var markerClickListener = google.maps.event.addListener(marker, 'click', function() {
					google.maps.event.removeListener(markerMouseoutListener);
			    	coordInfoWindow.open(scope.map, marker);
				});
				
				var markerMouseoverListener = google.maps.event.addListener(marker, 'mouseover', function() {
			    	coordInfoWindow.open(scope.map, marker);
				});

			}
			
		
			scope.$on('event:newmemberadded', function(event, new_member){
				scope.addPinForMember(new_member);
				scope.map.setCenter(marker.getPosition());
			});
			
			scope.$on('event:addmemberpins', function(event, members){
				for (var i=0; i<members.length; i++) {
					scope.addPinForMember(members[i]);
				}
				
			});
			
			scope.addInfoWindowForMember = function(member) {

			}
	
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function (position) {
					var fake_member = {
						firstname: 'Jen',
						place: {
							geometry: {
								location: {
									lat: position.coords.latitude,
									lng: position.coords.longitude
								}
							}
						}
					}
					scope.addPinForMember(fake_member);
		        });
		    }
  		}
	}
}]);

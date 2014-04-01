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
.directive('googleMap', ["$location", function ($location) {
	return {
		restrict: 'A',
		transclude: true,
		link: function (scope, elem, attrs) {
			
		    var defaultLatlng = new google.maps.LatLng(27.0000, 17.0000);
		    var mapOptions = {
		        zoom: 3,
		        center: defaultLatlng,
		        /*scrollwheel: false,
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
		        draggable: false,*/
			    mapTypeControl: false,
			    mapTypeControlOptions: {
			        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    },
			    panControl: true,
			    panControlOptions: {
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    },
			    zoomControl: true,
			    zoomControlOptions: {
			        style: google.maps.ZoomControlStyle.MEDIUM,
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    },
			    scaleControl: true,
			    scaleControlOptions: {
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    },
			    streetViewControl: false,
			    streetViewControlOptions: {
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    },
			    rotateControl: true,
			    rotateControlOptions: {
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    },
			    navigationControl: true,
			    navigationControlOptions: {
			        position: google.maps.ControlPosition.LEFT_BOTTOM
			    },
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    };

    		scope.map = new google.maps.Map(elem[0], mapOptions);

			scope.infoWindows = [];
			
			scope.addPinForMember = function(member, shouldHighlight, isNewMember) {
								
				var currentLocation = new google.maps.LatLng(member.place.geometry.location.lat, member.place.geometry.location.lng);
				var address = (member.place.vicinity !== undefined)? member.place.vicinity : member.place.name;
				
				var pinColor = "8C92FF";
			    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
			        new google.maps.Size(21, 34),
			        new google.maps.Point(0,0),
			        new google.maps.Point(10, 34));
			
				var marker = new google.maps.Marker({
	                position: currentLocation,
	                map: scope.map,
	                title: member.firstname,
				//	icon: pinImage,
				//	flat: true
	            });
	
				var member_info = '<div class="member-name">' 
									+ member.firstname + " " + member.lastname 
									+ '</div><div>'
									+ member.role
									+ '</div><div class="member-address">'
									+ address 
									+ '</div><div>'									
									+ '<a class="member-company-link" href="' 
									+ member.companyurl + '" rel="nofollow">'
									+ member.companyname 
									+ '</a></div><div>'
									+ member.companydescription 									
									+ '</div>';
								
				var info = '<div class="few-info">'
							+ member_info
							+ '</div>';
							
			if(isNewMember) {
					var new_member_intro = '<div class="few-thanks-header">'
												+ '<div>Thanks for pinning!</div>'
												+ '<div class="tweet-btn-container">'
												+ '<a href="https://twitter.com/share?'
												+ 'text=I just joined a global network of female entrepreneurs representing '
												+ address
												+ '&hashtags=projectfew'
												+ '&via=holafew'
												+ "&url=http://few.org" + '/?pin=' + member._id
												+ '" target="_blank">Send a tweet and spread the word!</a>'
												+ '</div>'
												+ '<div class=thanks-line></div>'
												+ '</div>';
												
					info = '<div class="few-info">'
								+ new_member_intro
								+ member_info
								+ '</div>';
			}
				
				var coordInfoWindow = new google.maps.InfoWindow({content: info});
				scope.infoWindows.push(coordInfoWindow);
				
				google.maps.event.addListener(coordInfoWindow, 'domready', function() {
					//dynamically change info window here
				});

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
				
				if(shouldHighlight) {
					scope.map.setCenter(marker.getPosition());
					scope.map.setZoom(5);
					coordInfoWindow.open(scope.map, marker);
				}
			}
			
			
			scope.$on('event:newmemberadded', function(event, new_member){
				for(var i=0; scope.infoWindows.length; i++) {
					scope.infoWindows[0].close();
				}
				scope.addPinForMember(new_member, true, true);
			});
			
			scope.$on('event:addmemberpins', function(event, members, highlightId){
				for (var i=0; i<members.length; i++) {
					scope.addPinForMember(members[i], (highlightId === members[i]._id), false);
				}
			});

  		}
	}
}]);

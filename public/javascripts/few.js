function initMap() {
    var defaultLatlng = new google.maps.LatLng(0, 0);
    var mapOptions = {
        zoom: 2,
        center: defaultLatlng
    }

    mapOptions = $.extend({
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
    }, mapOptions);

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            //map.setCenter(currentLocation);

            var marker = new google.maps.Marker({
                position: currentLocation,
                map: map,
                title: 'FEW member'
            });
        });
    }
}

$(function() {
    google.maps.event.addDomListener(window, 'load', initMap);
});


// Map initialization
const map = L.map('map').setView([0, 0], 2);

// OpenStreetMap Tiles
L.tileLayer('https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=42dcc4335f134d00bb273958d5b3008d', {
	maxZoom: 22,
	attribution: '© Thunderforest, © OpenStreetMap contributors'
}).addTo(map);
/*replace pioneer with names bellow to change map style
	cycle
	transport
	landscape
	outdoors
	transport-dark
	spinal-map
	pioneer
	mobile-atlas
	neighbourhood
	atlas
*/

// mark representing player's position (null while not created)
let marker = null;

const playerIcon = L.icon({
    iconUrl: 'cursor position.png',     // Chemin vers ton image
    iconSize: [25, 25],        // Taille de l’icône
    iconAnchor: [20, 20],      // Point central
    popupAnchor: [0, -20]      // Position du popup
});


// stocks last known position for a fluent animation
let currentLatLng = null;

function updatePosition(pos) {

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

	// creates a Leaflet opbject by using gps coordinates
    const newLatLng = L.latLng(lat, lon);

	// if marker not created yet (first position detected)
    if (!marker) {
        marker = L.marker(newLatLng, {icon: playerIcon}).addTo(map);

		// centers map on player's position with 18 zoom
        map.setView(newLatLng, 18);

		// stocks player's position for next interpolation
        currentLatLng = newLatLng;

    } else {
        animateMarker(currentLatLng, newLatLng, 600);

		// follow player's position fludemment
        map.panTo(newLatLng, { animate: true, duration: 0.5 });

		// updates memorized player's position
        currentLatLng = newLatLng;
    }
}


// Continious GPS tracking of player's position
if (navigator.geolocation) {
	navigator.geolocation.watchPosition(
		updatePosition,
		(err) => alert("Impossible de récupérer la position."),
		{
			enableHighAccuracy: true, // better accuracy
			maximumAge: 0,
			timeout: 5000
		}
	);
} else {
	alert("La géolocalisation n'est pas supportée.");
}
// Map initialization
const map = L.map('map').setView([0, 0], 2);

// OpenStreetMap Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '© OpenStreetMap'
}).addTo(map);

let marker = null;

// Fonction called after every update of player position
function updatePosition(pos) {
	const lat = pos.coords.latitude;
	const lon = pos.coords.longitude;

	// Center the map for the first time
	map.setView([lat, lon], 18);

	if (!marker) {
		// Create a marker for player's position
		marker = L.marker([lat, lon]).addTo(map)
			.bindPopup("Position actuelle")
			.openPopup();
	} else {
		// Else move the existing marker to current player's position
		marker.setLatLng([lat, lon]);
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
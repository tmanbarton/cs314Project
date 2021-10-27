export function latLngToText(latLng, precision = 2) {
    return latLng ? `${latLng.lat.toFixed(precision)}, ${latLng.lng.toFixed(precision)}` : "";
}

export function placeToLatLng(place) {
    return place && place.latitude && place.longitude ? { lat: parseFloat(place.latitude), lng: parseFloat(place.longitude) } : place;
}

export function latLngToPlace(latLng) {
    return latLng && latLng.lat && latLng.lng ? { latitude: latLng.lat.toString(), longitude: latLng.lng.toString() } : latLng;
}

export function formatPlaces(places){
	if(places){
		let formattedPlaces = [];
		
		for(let i = 0; i < places.length; i++){
			formattedPlaces.push({...latLngToPlace(places[i]), name: places[i].name});
		}
		return formattedPlaces;
	}
	return places;
}
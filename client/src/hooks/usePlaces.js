import { useState, useEffect } from 'react';
import { placeToLatLng, formatPlaces } from '../utils/transformers';
import { reverseGeocode } from '../utils/reverseGeocode';
import { LOG, EARTH_RADIUS_UNITS_DEFAULT } from '../utils/constants';
import {
	sendAPIRequest,
	isJsonResponseValid
} from "../utils/restfulAPI";

export function usePlaces(serverSettings, showMessage) {
    const [places, setPlaces] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [distances, setDistances] = useState();
    const [previous, setPrevious] = useState([]);
    const currentTrip = places;

    useEffect(()=>{
        updatePrevious(previous, setPrevious, currentTrip);
    }, [currentTrip]);

    useEffect(() => {
        console.log(showMessage);
      }, [showMessage]);
    
    const context = { places, setPlaces, selectedIndex, setSelectedIndex, previous, setPrevious, serverSettings, showMessage, distances, setDistances };
    const placeActions = {
        append: async (place) => append(place, context),
        removeAtIndex: (index) => removeAtIndex(index, context),
        removeAll: () => removeAll(context),
        selectIndex: (index) => selectIndex(index, context),
        moveToHome: () => moveToHome(context),
        bulkAppend: async (newPlaces, selectedPlace) => bulkAppend(newPlaces, selectedPlace, context),
        undo: () => undo(context)
    };

    return {places, selectedIndex, placeActions, distances, setSelectedIndex};
}

async function bulkAppend(newPlaces, index=0, context){
    const {setPlaces, setSelectedIndex, setDistances, serverSettings, showMessage} = context;
    const formattedPlaces = formatPlaces(newPlaces);
    if(serverSettings.serverConfig.features.indexOf("distances") > -1){
        buildAndSendDistanceRequest(formattedPlaces, setDistances, serverSettings, showMessage);
    }
    setPlaces(formattedPlaces);
    setSelectedIndex(index);
}

async function append(place, context) {
    const { places, setPlaces, setSelectedIndex, serverSettings, showMessage, setDistances } = context;

    const fullPlace = await reverseGeocode(placeToLatLng(place));
    const newPlaces = [...places, fullPlace]
    
    if(serverSettings.serverConfig.features.indexOf("distances") > -1){
        buildAndSendDistanceRequest(places, setDistances, serverSettings, showMessage);
    }
    setPlaces(newPlaces);
    setSelectedIndex(newPlaces.length - 1);

}

function buildAndSendDistanceRequest(newPlaces, setDistances, serverSettings, showMessage){
    const request = buildDistanceRequest(formatPlaces(newPlaces), EARTH_RADIUS_UNITS_DEFAULT.miles);
    sendDistanceRequest(request, setDistances, serverSettings,showMessage);
}
export function buildDistanceRequest(places, radius){
	return {
		requestType: "distances",
		places: places,
		earthRadius: radius,
	};
}
export async function sendDistanceRequest(request, setDistances, serverSettings, showMessage) {
	const distanceResponse = await sendAPIRequest(request, serverSettings.serverUrl);
	if (distanceResponse && isJsonResponseValid(distanceResponse, distanceResponse)) {
        if(setDistances){
            setDistances(distanceResponse["distances"]);
        }
        return distanceResponse["distances"];
        
	} else {
		showMessage(
			`Distance request to ${serverSettings.serverUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}


function removeAtIndex(index, context) {
    const { places, setPlaces, selectedIndex, setSelectedIndex, serverSettings, showMessage, setDistances } = context;

    if (index < 0 || index >= places.length) {
        LOG.error(`Attempted to remove index ${index} in places list of size ${places.length}.`);
        return;
    }
    const newPlaces = places.filter((place, i) => index !== i);
    setPlaces(newPlaces);

    if (newPlaces.length === 0) {
        setSelectedIndex(-1);
        setDistances(undefined);
    } else if (selectedIndex >= index && selectedIndex !== 0) {
        setSelectedIndex(selectedIndex - 1);
        buildAndSendDistanceRequest(newPlaces, setDistances, serverSettings, showMessage);
    }
}

async function removeAll(context) {
    const { places, setPlaces, setSelectedIndex, setDistances } = context;
    places.length = 0;
    setDistances(undefined);
    setPlaces([]);
    setSelectedIndex(-1);
}

function selectIndex(index, context) {
    const { places, setSelectedIndex } = context;

    if (index < -1 || index >= places.length) {
        LOG.error(`Attempted to select index ${index} in places list of size ${places.length}.`);
        setSelectedIndex(-1);
        return;
    }
    setSelectedIndex(index);
}

async function moveToHome(context) {
	const { places, selectedIndex } = context;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}

	function onSuccess({ coords }) {
		const place = {
			latitude: '' + coords.latitude,
			longitude: '' + coords.longitude,
			name: "Current Location",
		};
        const newPlaces = [place, ...places];
		bulkAppend(newPlaces, 0, context);
		//   console.log(`The user is located at ${JSON.stringify(place)}.`); // use LOG.info() instead
	}

	function onError(error) {
		console.log(error.message);
	}
}

function updatePrevious(previous, setPrevious, places){
     setPrevious([...previous, {places:formatPlaces(places)}]);
}

function undo(context) {
	const { places, selectedIndex, previous, setPrevious } = context;
	const n = previous.length - 1;
	const selectedPlace = places[selectedIndex];
	const lastTrip = previous[n - 1] ? previous[n - 1] : [];
	const newPrev = previous.filter((prev, i) => n !== i);
    const index = getPlaceIndex(lastTrip.places, selectedPlace);
    bulkAppend(lastTrip.places, index, context);
    setPrevious(newPrev);
	// Why doesn't this work 😭
	// bulkAppend(lastTrip, lastTrip.indexOf(selectedPlace), context);
	// setPrevious(newPrev);
}

function getPlaceIndex(newPlaces, selectedPlace){
    for(let i = 0; i < newPlaces.length; i++){
        if(isSelectedPlace(newPlaces[i], selectedPlace)){
            return i;
        }
    }
}

function isSelectedPlace(lastTripPlace, selectedPlace) {
	return (
		lastTripPlace.name === selectedPlace.name &&
		lastTripPlace.latitude === selectedPlace.latitude &&
		lastTripPlace.longitude === selectedPlace.longitude
	);
}
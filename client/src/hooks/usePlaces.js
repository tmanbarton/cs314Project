import { useState, useEffect } from 'react';
import { latLngToPlace, placeToLatLng } from '../utils/transformers';
import { reverseGeocode } from '../utils/reverseGeocode';
import { LOG } from '../utils/constants';
import {
	sendAPIRequest,
	isJsonResponseValid
} from "../utils/restfulAPI";

export function usePlaces(serverSettings, showMessage) {
    const [places, setPlaces] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [distances, setDistances] = useState();
    useEffect(() => {
        console.log(showMessage)
      }, [showMessage])
    const context = { places, setPlaces, selectedIndex, setSelectedIndex, serverSettings, showMessage, distances, setDistances };
    const placeActions = {
        append: async (place) => append(place, context),
        removeAtIndex: (index) => removeAtIndex(index, context),
        removeAll: () => removeAll(context),
        selectIndex: (index) => selectIndex(index, context),
        moveToHome: () => moveToHome(context),
    };

    return {places, selectedIndex, placeActions, distances};
}

async function append(place, context) {
    const { places, setPlaces, setSelectedIndex, serverSettings, showMessage, setDistances } = context;

    const fullPlace = await reverseGeocode(placeToLatLng(place));
    places.push(fullPlace);
    
    if(serverSettings.serverConfig.features.indexOf("distances") > -1){
        buildAndSendDistanceRequest(places, setDistances, serverSettings, showMessage);
    }

    setPlaces(places);
    setSelectedIndex(places.length - 1);

}


function buildAndSendDistanceRequest(newPlaces, setDistances, serverSettings, showMessage){
    const placeList = buildPlacesList(newPlaces);
    const request = buildDistanceRequest(placeList, 3958);
    sendDistanceRequest(request, setDistances, serverSettings,showMessage);
}

function buildPlacesList(places){
	let placeList = []
	places.forEach(place => {
		placeList.push(latLngToPlace(place));
	});
	return placeList;
}
function buildDistanceRequest(places, radius){
	return {
		requestType: "distances",
		places: places,
		earthRadius: radius,
	};
}
async function sendDistanceRequest(request, setDistances, serverSettings, showMessage) {
	const distanceResponse = await sendAPIRequest(request, serverSettings.serverUrl);
	if (distanceResponse && isJsonResponseValid(distanceResponse, distanceResponse)) {
		setDistances(distanceResponse["distances"]);
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
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    
    function onSuccess({coords}) {
      const place = {latitude: coords.latitude, longitude: coords.longitude};
      append(place, context);
  
    //   console.log(`The user is located at ${JSON.stringify(place)}.`); // use LOG.info() instead
    }
  
    function onError(error) {
      console.log(error.message);
    }
  }
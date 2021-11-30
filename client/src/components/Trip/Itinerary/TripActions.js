import  React from "react";
import { useToggle } from "../../../hooks/useToggle";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { formatPlaces } from "../../../utils/transformers";
import { IoIosSpeedometer } from "react-icons/io";
import { FaAngleDoubleLeft, FaSortAlphaDown, FaSlidersH, FaTrashAlt } from "react-icons/fa"
import { ImShuffle } from "react-icons/im"
import { EARTH_RADIUS_UNITS_DEFAULT, DEFAULT_RESPONSE_TIME } from "../../../utils/constants";
import { isJsonResponseValid, SCHEMAS, sendAPIRequest } from "../../../utils/restfulAPI";
import { buildDistanceRequest, sendDistanceRequest } from "../../../hooks/usePlaces";
import { totalDistance } from "./Itinerary";



export default function TripActions(props){

    return (
        <ActionsDropdown
            disabled={props.disableTour}
            bulkAppend={props.bulkAppend}
            serverSettings={props.serverSettings}
            showMessage={props.showMessage}
            tripName={props.tripName}
            setChangedTrip={props.setChangedTrip}
            selectedIndex={props.selectedIndex}
            places={props.places}
            distances={props.distances}
            removeAll={props.removeAll}
        />
    );
}

function ActionsDropdown(props) {
    const [dropdownOpen, setDropdownOpen] = useToggle(false);
    return (
        <Dropdown 
            isOpen={dropdownOpen}
            toggle={setDropdownOpen}
            direction="up"
            size="sm"
            className="button-group"
            data-testid="dropdown" 
        >
            <DropdownToggle color='primary' className="modify-dropdown" style={{borderRadius: '0px', borderTopRightRadius: '.2em'}}>
                <FaSlidersH size={18} />
                <p className="button-label">Modify</p>
            </DropdownToggle>
            <TripModifications {...props}/>
        </Dropdown>
    );
}

function TripModifications(props){
    const tripObject = buildTripObject(props.places, props.distances);
    return(
        <DropdownMenu right>
            <DropdownItem onClick={()=> optimizeTrip(tripObject,{bulkAppend: props.bulkAppend, serverSettings: props.serverSettings, showMessage: props.showMessage, tripName: props.tripName}, props.setChangedTrip)} disabled={props.disabled}>
                <Row><IoIosSpeedometer className="fa-inline" data-testid="optimize" size = {20}/>&nbsp;&nbsp;<h4>Optimize</h4></Row>
            </DropdownItem>
            <DropdownItem onClick={()=> shuffleTrip(tripObject, {bulkAppend: props.bulkAppend}, props.selectedIndex, props.setChangedTrip)}>
                <Row><ImShuffle className="fa-inline" data-testid="shuffleBtn" size = {20}/>&nbsp;&nbsp;<h4>Shuffle</h4></Row>
            </DropdownItem>
            <DropdownItem onClick={()=> reversePlaces(tripObject, {bulkAppend: props.bulkAppend}, props.selectedIndex, props.setChangedTrip)}>
                <Row><FaAngleDoubleLeft className="fa-inline" data-testid="reverse" size = {20} />&nbsp;&nbsp;<h4>Reverse</h4></Row>
            </DropdownItem>
            <DropdownItem onClick={()=> alphaSort(tripObject, {bulkAppend: props.bulkAppend}, props.selectedIndex, props.setChangedTrip)}>
                <Row><FaSortAlphaDown className="fa-inline" data-testid="alphasort" size = {20}/>&nbsp;&nbsp;<h4>Sort</h4></Row>
            </DropdownItem>
            <DropdownItem onClick={() => props.removeAll()}>
                <Row><FaTrashAlt className="fa-inline" data-testid="delete-all-button" size = {20}/>&nbsp;&nbsp;<h4>Clear</h4></Row>
            </DropdownItem>
        </DropdownMenu>
    );
}

function optimizeTrip(tripObject, apiObject, setChangedTrip){
    sendTourRequest(buildTourRequest(tripObject.places), apiObject, tripObject, setChangedTrip);
}

function buildTripObject(places, distances){
    return {
        places: formatPlaces(places),
        distances: distances
    }
}

function buildTourRequest(places){
    return {
        requestType: "tour",
        earthRadius: EARTH_RADIUS_UNITS_DEFAULT.miles,
        response: DEFAULT_RESPONSE_TIME,
        places: places
    };
}

function evaluateOptimization(apiObject, diffTotal, setChangedTrip, optimizedPlaces){
    if(diffTotal !== 0){
        apiObject.showMessage(`Successfully optimized ${apiObject.tripName}. Saved ${diffTotal} miles!`, "success");
        apiObject.bulkAppend(optimizedPlaces);
        setChangedTrip(true);
    }else{
        apiObject.showMessage(`${apiObject.tripName} is already optimized!`, "info");
        setChangedTrip(false);
    }
    
}

async function sendTourRequest(request, apiObject, tripObject, setChangedTrip){
    const prevTotal = totalDistance(tripObject.distances);
    const tourResponse = await sendAPIRequest(request, apiObject.serverSettings.serverUrl);
    if(tourResponse && isJsonResponseValid(tourResponse, SCHEMAS.tour)){
        const newTotal = totalDistance(await sendDistanceRequest(buildDistanceRequest(tourResponse.places, EARTH_RADIUS_UNITS_DEFAULT.miles), undefined, apiObject.serverSettings, apiObject.showMessage));
        const diffTotal = Math.abs(prevTotal - newTotal);
        evaluateOptimization(apiObject, diffTotal, setChangedTrip, tourResponse.places);
    }else{
        apiObject.showMessage(
			`Tour request to ${apiObject.serverSettings.serverUrl} failed. Check the log for more details.`,
			"error"
		);
        setChangedTrip(false);
    }    
}
function reversePlaces(tripObject, bulkAppend, selectedIndex, setChangedTrip) {
    const selectedPlace = tripObject.places[selectedIndex];
    
    if(tripObject.places.length > 2){
        tripObject.places.push(tripObject.places[0]) 
        tripObject.places.shift();   
        tripObject.places.reverse();

        bulkAppend.bulkAppend(tripObject.places, tripObject.places.indexOf(selectedPlace));
        setChangedTrip(true);
    }
}

function alphaSort(tripObject, bulkAppend, selectedIndex, setChangedTrip) {
    const selectedPlace = tripObject.places[selectedIndex];
    const firstPlace = tripObject.places.shift();
    tripObject.places.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    });
    const newPlace = maintainStartingLocation(firstPlace, tripObject.places);
    bulkAppend.bulkAppend(newPlace, newPlace.indexOf(selectedPlace));
    setChangedTrip(true);
}

function shuffleTrip(tripObject, bulkAppend, selectedIndex, setChangedTrip) {
    const selectedPlace = tripObject.places[selectedIndex];
    const firstPlace = tripObject.places.shift();
    let currentIndex = tripObject.places.length,  randomIndex;
    
    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [tripObject.places[currentIndex], tripObject.places[randomIndex]] = [
        tripObject.places[randomIndex], tripObject.places[currentIndex]];
    }
    const newPlace = maintainStartingLocation(firstPlace, tripObject.places);
    bulkAppend.bulkAppend(newPlace, newPlace.indexOf(selectedPlace));
    setChangedTrip(true);
}

function maintainStartingLocation(firstPlace, modifedPlaces){
    return [firstPlace, ...modifedPlaces];
}

import React, { useEffect, useState, Fragment } from "react";
import { InputGroup, InputGroupAddon, Input, Container, Button, Row, Col } from "reactstrap";
import { FaDice, FaGlobe, FaSearch, FaArrowDown } from "react-icons/fa";
import {
	sendAPIRequest,
	isJsonResponseValid
} from "../../../utils/restfulAPI";
import { SearchResults } from "./SearchResults";
import { LOG } from "../../../utils/constants";
import Coordinates from "coordinate-parser"
import { reverseGeocode } from '../../../utils/reverseGeocode';
import { formatPlaces } from "../../../utils/transformers";

export default function SearchInput(props) {
	const [places, setPlaces] = useState([]);
	const [found, setFound] = useState();
	const [match, setMatch] = useState('');
	const [limit, setLimit] = useState(5)
	const [noResultsFound, setNoResultsFound] = useState(false);
	const [searchMode, setSearchMode] = useState('search');
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');

	const searchStates = {
		setPlaces: setPlaces,
		setNoResultsFound: setNoResultsFound,
		setSearchMode: setSearchMode,
		searchMode: searchMode,
		match: match,
		limit: limit,
		setMatch: setMatch,
		setFound: setFound,
		setLon: setLon,
		setLat: setLat,
		lat: lat,
		lon: lon,
	};

	useEffect(() => {
		if (limit > found) setLimit(found);
	}, [found, limit]);

	useEffect(() => {
		setMatch("");
		setPlaces([]);
	}, [searchMode]);
	
	useEffect(() => {
		setPlaces([]);
		setMatch("");
		setNoResultsFound(false);
		setSearchMode("search");
	}, [props.showSearch]);

	useEffect(() => {
		if (match.length) {
			const request = buildFindRequest(match, limit);
			sendFindRequest( request, searchStates, props.serverSettings, props.showMessage);
		} else {
			setPlaces([]);
			setNoResultsFound(false);
		}
		setLimit(5);
	}, [match]);

	useEffect(() => {
		cordinateSearch(searchStates)
	}, [lon, lat]);

	return (
		<Container>
			<Searchbar {...props} limit={limit} searchStates={searchStates}/>
			<hr />
			<SearchResults places={places} append={props.append} noResultsFound={noResultsFound} found={found} searchMode={searchMode} />
			<br />
			{places.length && searchMode !== 'coords' ?
				<Row>
					<Col>
						<p style={{paddingTop: '.75rem'}}>Showing: {limit} out of {found} results</p>
					</Col>
					<ShowMore searchStates={searchStates} setLimit={setLimit} serverSettings={props.serverSettings} showMessage={props.showMessage}/> 		
				</Row>
			: null}
		</Container>
	);
}


function ShowMore(props){
	return (
		<Button size="sm" className="rightButton" color="primary" onClick={()=> getMoreResults(props.searchStates.limit, props.setLimit, props.searchStates, props.serverSettings, props.showMessage )}><FaArrowDown size={16}/> <p className="button-label">More</p></Button>
	)
}

function getMoreResults(limit, setLimit, searchStates, serverSettings, showMessage) {
	let newLimit = limit*2
	setLimit(newLimit);
	const request = buildFindRequest(searchStates.match, newLimit);
	sendFindRequest(request, searchStates, serverSettings, showMessage);
}

function Searchbar(props){
	return (
		<InputGroup>
			<InputBar {...props.searchStates}/>
			<InputGroupAddon addonType="append">
				<Button color="primary" className="input-group-buttons" data-testid="randomPlaces" onClick={() => { randomPlaces(props.searchStates, props.serverSettings, props.showMessage, props.limit)}}>
					<FaDice size={18} />
				</Button>
			</InputGroupAddon>
			<InputGroupAddon addonType="append" hidden={props.searchStates.searchMode.toLowerCase() === 'coords'}>
				<Button color="primary" className="input-group-buttons" data-testid="byCoordinates" onClick={()=> props.searchStates.setSearchMode('coords')}>
					<FaGlobe size={18} />
				</Button>
			</InputGroupAddon>
			<InputGroupAddon addonType="append" hidden={props.searchStates.searchMode.toLowerCase() === 'search'}>
				<Button color="primary" className="input-group-buttons" data-testid="byString" onClick={()=> props.searchStates.setSearchMode('search')}>
					<FaSearch size={18} />
				</Button>
			</InputGroupAddon>
		</InputGroup>
	);
}

function InputBar(props){
	switch (props.searchMode.toLowerCase()){
		case 'search':
			return (
				<Input type="text" placeholder="Search for Places" onChange={(input)=>props.setMatch(input.target.value)} value={props.match} />
			)
		case 'random':
			return(
				<Input type="text" placeholder="Random Places" data-testId="randomBar" disabled={true}/>
			);
		case 'coords':
			return(
				<React.Fragment>
					<Input type="text" placeholder="Latitude" onChange={(input)=>props.setLat(input.target.value)} data-testid="latInput" value={props.lat}/>
					<Input type="text" placeholder="Longitude" onChange={(input)=>props.setLon(input.target.value)} data-testid="lngInput" value={props.lon}/>
				</React.Fragment>
			);
		default:
			return (null);
	}
}

function randomPlaces(searchStates, serverSettings, showMessage, limit){
	searchStates.setSearchMode('random');
	const request = buildFindRequest("", limit);
	sendFindRequest(request, searchStates, serverSettings, showMessage);
}

function buildFindRequest(match, limit) {
	return {
		requestType: "find",
		match: match,
		limit: limit,
	};
}

async function sendFindRequest(request, searchStates, serverSettings, showMessage) {
	const findResponse = await sendAPIRequest(request, serverSettings.serverUrl);
	if (findResponse && isJsonResponseValid(findResponse, findResponse)) {
		searchStates.setPlaces(findResponse["places"]);
		searchStates.setFound(findResponse["found"]);
		searchStates.setNoResultsFound(findResponse["places"].length ? false : true);
	} else {
		showMessage(
			`Find request to ${serverSettings.serverUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}

async function cordinateSearch(searchStates) {
	searchStates.setSearchMode('coords');
	const latLng = { lat: searchStates.lat, lng: searchStates.lon };
	if (useCoordinateValidation(latLng.lat + "," + latLng.lng)) {
		const newPlace = await reverseGeocode(latLng);
		if(newPlace.lat<=-90){
			newPlace.lat = newPlace.lat%(-90);
		}
		if(newPlace.lat>=90){
			newPlace.lat = newPlace.lat%(90);
		}
		if(newPlace.lng<=-180){
			newPlace.lng = newPlace.lng%(-180);
		}
		if(newPlace.lng>=180){
			newPlace.lng = newPlace.lng%(180);
		}
		searchStates.setPlaces(formatPlaces([newPlace]));
	} 
  }

function useCoordinateValidation(newPlace) {
    const newLatLng = getCoordinatesOrNull(newPlace);
	return newLatLng;
}
  
  
function getCoordinatesOrNull(coordinatesString) {
    try {
      const convertedCoordinates = new Coordinates(coordinatesString);
	  return {
        lat: convertedCoordinates.getLatitude(),
        lng: convertedCoordinates.getLongitude()
      };
    } catch (error) {
      return null;
    }
  }

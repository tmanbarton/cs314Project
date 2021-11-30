import React, { useEffect, useState, Fragment } from "react";
import { InputGroup, InputGroupAddon, Input, Container, Button, Row, Col } from "reactstrap";
import { FaDice, FaGlobe, FaSearch, FaArrowDown } from "react-icons/fa";
import {
	sendAPIRequest,
	isJsonResponseValid
} from "../../../utils/restfulAPI";
import { SearchResults } from "./SearchResults";

export default function SearchInput(props) {
	const [places, setPlaces] = useState([]);
	const [found, setFound] = useState();
	const [match, setMatch] = useState('');
	const [limit, setLimit] = useState(5)
	const [noResultsFound, setNoResultsFound] = useState(false);
	const [searchMode, setSearchMode] = useState('search');

	const searchStates = {
		setPlaces: setPlaces,
		setNoResultsFound: setNoResultsFound,
		setSearchMode: setSearchMode,
		searchMode: searchMode,
		match: match,
		limit: limit,
		setMatch: setMatch,
		setFound: setFound,
	};

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
	}, [match]);

	return (
		<Container>
			<Searchbar {...props} limit={limit} searchStates={searchStates} />
			<hr />
			<SearchResults places={places} append={props.append} noResultsFound={noResultsFound} found={found} searchMode={searchMode} />
			<Row>
				<Col>
					{places.length ? <p>Showing: {limit} out of {found} results</p>: null}
				</Col>
				{places.length ? <ShowMore searchStates={searchStates} setLimit={setLimit} serverSettings={props.serverSettings} showMessage={props.showMessage}/> : null}		
			</Row>
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
			<InputBar {...props.searchStates} />
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
				<Input type="text" placeholder="Search for Places" onChange={(input)=>props.setMatch(input.target.value)} data-testid="searchBar" value={props.match} />
			)
		case 'random':
			return(
				<Input type="text" placeholder="Random Places" data-testId="randomBar" disabled={true}/>
			);
		case 'coords':
			return(
				<React.Fragment>
					<Input type="text" placeholder="Latitude" data-testid="latInput"/>
					<Input type="text" placeholder="Longitude" data-testid="lngInput"/>
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

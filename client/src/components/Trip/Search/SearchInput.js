import React, { useEffect, useState } from "react";
import { InputGroup, InputGroupAddon, Input, Container, Button } from "reactstrap";
import { FaDice, FaGlobe } from "react-icons/fa";
import {
	sendAPIRequest,
	isJsonResponseValid
} from "../../../utils/restfulAPI";
import { SearchResults } from "./SearchResults";

const limit = 5;

export default function SearchInput(props) {
	const [places, setPlaces] = useState([]);
	const [match, setMatch] = useState('');
	const [noResultsFound, setNoResultsFound] = useState(false);

	useEffect(()=>{
		setPlaces([]);
		setMatch('');
		setNoResultsFound(false);
	},[props.showSearch]);

	useEffect(()=>{
		if(match.length){
			const request = buildFindRequest(match);
			sendFindRequest(request, {setPlaces: setPlaces, setNoResultsFound: setNoResultsFound}, props.serverSettings, props.showMessage);
		}else{
			setPlaces([]);
			setNoResultsFound(false);
		}
	},[match]);

	return (
		<Container>
			<Searchbar {...props} setMatch={setMatch} setNoResultsFound={setNoResultsFound} setPlaces={setPlaces} match={match} />
			<hr />
			<SearchResults places={places} append={props.append} noResultsFound={noResultsFound}/>
		</Container>
	);
}

function Searchbar(props){
	return (
		<InputGroup>
			<Input type="text" placeholder="Search for Places" onChange={(input)=>props.setMatch(input.target.value)} data-testid="searchBar" value={props.match} />
			<InputGroupAddon addonType="append">
				<Button color="primary" className="input-group-buttons" data-testid="randomPlaces" onClick={() => { randomPlaces({setPlaces: props.setPlaces, setNoResultsFound: props.setNoResultsFound}, props.serverSettings, props.showMessage)}}>
					<FaDice size={18}/>
				</Button>
			</InputGroupAddon>
			<InputGroupAddon addonType="append" >
				<Button color="primary" className="input-group-buttons" data-testid="byCoordinates">
					<FaGlobe size={18}/>
				</Button>
			</InputGroupAddon>
		</InputGroup>
	);
}

function randomPlaces(searchStates, serverSettings, showMessage){
	const request = buildFindRequest("");
	sendFindRequest(request, searchStates, serverSettings, showMessage)
}

function buildFindRequest(match) {
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
		searchStates.setNoResultsFound(findResponse["places"].length ? false : true);
	} else {
		showMessage(
			`Find request to ${serverSettings.serverUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}

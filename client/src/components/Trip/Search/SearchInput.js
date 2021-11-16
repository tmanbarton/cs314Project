import React, { useEffect, useState } from "react";
import { Input, Container } from "reactstrap";
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
			<div>
				<Input
					type="text"
					placeholder="Search for Places"
					onChange={(input)=>setMatch(input.target.value)}
					data-testid="searchBar"
					value={match}
				/>
			</div>
			<hr />
			<div>
				<SearchResults places={places} append={props.append} noResultsFound={noResultsFound}/>
			</div>
		</Container>
	);
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

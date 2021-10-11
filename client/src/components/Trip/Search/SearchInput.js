import React, { useState } from "react";
import { Input, Container } from "reactstrap";
import {
	sendAPIRequest,
	isJsonResponseValid
} from "../../../utils/restfulAPI";
import { SearchResults } from "./SearchResults";

const limit = 5;

export default function SearchInput(props) {
	const [places, setPlaces] = useState();

	function inputChanged(input) {
		let match = input.target.value;
		const request = buildRequest(match);
		sendFindRequest(request, setPlaces, props.serverSettings, props.showMessage);
	}

	return (
		<Container>
			<div>
				<Input
					type="text"
					placeholder="Search for Places"
					onChange={inputChanged}
					data-testid="searchBar"
				></Input>
			</div>
			<hr />
			<div>
				<SearchResults places={places} append={props.append} />
			</div>
		</Container>
	);
}

function buildRequest(match) {
	return {
		requestType: "find",
		match: match,
		limit: limit,
	};
}

async function sendFindRequest(request, setPlaces, serverSettings, showMessage) {
	const findResponse = await sendAPIRequest(request, serverSettings.serverUrl);
	if (findResponse && isJsonResponseValid(findResponse, findResponse)) {
		setPlaces(findResponse["places"]);
	} else {
		showMessage(
			`Find request to ${serverUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}

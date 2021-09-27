import React, { useState } from "react";
import { Input, Container } from "reactstrap";
import {
	sendAPIRequest,
	getOriginalServerUrl,
	isJsonResponseValid
} from "../../../utils/restfulAPI";
import { SearchResults } from "./SearchResults";
import FindResponse from "../../../../schemas/FindResponse.json"

const limit = 5;
const serverUrl = getOriginalServerUrl();

export default function SearchInput(props) {
	const [places, setPlaces] = useState();

	function inputChanged(input) {
		let match = input.target.value;
		const request = buildRequest(match);
		sendFindRequest(request, setPlaces);
	}

	return (
		<Container>
			<div>
				<Input
					type="text"
					placeholder="Search for Places"
					onChange={inputChanged}
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

async function sendFindRequest(request, setPlaces) {
	const findResponse = await sendAPIRequest(request, serverUrl);
	if (findResponse && isJsonResponseValid(findResponse, findResponse)) {
		setPlaces(findResponse["places"]);
	} else {
		showMessage(
			`Find request to ${serverUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}

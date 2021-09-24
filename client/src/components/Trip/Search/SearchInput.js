import  React, { useState } from "react";
import { Input, Container } from "reactstrap";
import { sendAPIRequest, getOriginalServerUrl } from "../../../utils/restfulAPI";
import { SearchResults } from "./SearchResults";

const limit = 5;
const serverUrl = getOriginalServerUrl();

export default function SearchInput() {
	const [match, setMatch] = useState("");
	const [places, setPlaces] = useState();

	function inputChanged(input) {
		setMatch(input.target.value);
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
				{<SearchResults places={places} />}
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
	if (findResponse) {
		setPlaces(findResponse["places"]);
	} else {
		showMessage(
			`Find request to ${serverUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}

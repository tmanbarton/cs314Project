import { React, useState } from "react";
import { Input } from "reactstrap";
import { sendAPIRequest, getOriginalServerUrl } from "../../../utils/restfulAPI";
import { SearchResults } from "./SearchResults";

const [match, setMatch] = useState("");
const [places, setPlaces] = useState({});
const limit = 10;
const serverUrl = getOriginalServerUrl();

export default function SearchInput() {
	return (
		<Container>
			<Section>
				<Input
					type="text"
					placeholder="Search for Places"
					onChange={inputChanged}
				></Input>
			</Section>
			<Section>
				<SearchResults places={places} />
			</Section>
		</Container>
	);
}

function inputChanged(input) {
	setMatch(input);
	buildRequest();
	sendFindRequest();
}

function buildRequest() {
	let request = {
		requestType: "find",
		match: match,
		limit: limit,
	};
	sendFindRequest(request);
}

async function sendFindRequest(request) {
	const findResponse = await sendAPIRequest(request, serverUrl);
	if (findResponse) {
		setPlaces(findResponse["properties"].places);
	} else {
		showMessage(
			`Find request to ${serverUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}

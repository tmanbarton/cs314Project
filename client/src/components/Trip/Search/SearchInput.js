import React from 'react'


export default function SearchInput(props) {
    // return (

    // );
}


async function sendFindRequest() {
	const findResponse = await sendAPIRequest({ requestType: "find" }, serverUrl);
	if (findResponse) {
		const places = findResponse["properties"].places;
	} else {
		showMessage(`Find request to ${serverUrl} failed. Check the log for more details.`, "error");
	}
	return places;
}

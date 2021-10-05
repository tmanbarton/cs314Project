import React, { useState } from "react";
import { Table, Container, Row, Col, Collapse } from "reactstrap";
import { latLngToText } from "../../../utils/transformers";
import { FaHome, FaTrashAlt, FaSearch } from "react-icons/fa";
import { DEFAULT_STARTING_PLACE } from "../../../utils/constants";
import { useToggle } from "../../../hooks/useToggle";
import Search from "../Search/Search";
import { PlaceActionsDropdown } from "./actions.js";
import {
	sendAPIRequest,
	isJsonResponseValid
} from "../../../utils/restfulAPI";

export default function Itinerary(props) {
	const [showSearch, toggleSearch] = useToggle(false);

	return (
		<Container>
			<Header placeActions={props.placeActions} toggleSearch={toggleSearch} disableSearch={props.disableSearch}/>
			<hr />
			<Collapse isOpen={showSearch}>
				<Search serverSettings={props.serverSettings} append={props.placeActions.append} showMessage={props.showMessage}/>
			</Collapse>
			<Table responsive striped>
				<Body serverSettings={props.serverSettings} showMessage={props.showMessage} places={props.places} placeActions={props.placeActions} />
			</Table>
		</Container>
	);
}

function Header(props) {
	return (
		<Row>
			<Col>
				<h4>My Trip</h4>
			</Col>
			<Col>
				<div className="float-right">
					<FaHome
						size={24}
						onClick={() => props.placeActions.append(DEFAULT_STARTING_PLACE)}
						data-testid="home-button"
					/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<FaSearch className={ props.disableSearch ? "fa-disabled" : ""} size={24} onClick={props.disableSearch ? null : props.toggleSearch } />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<FaTrashAlt
						size={24}
						onClick={() => props.placeActions.removeAll()}
						data-testid="delete-all-button"
					/>
				</div>
			</Col>
		</Row>
	);
}

function Body(props) {
	return (
		<tbody>
			{props.places.map((place, index) => (
				<TableRow
					key={`table-${JSON.stringify(place)}-${index}`}
					place={place}
					placeActions={props.placeActions}
					index={index}
					places={props.places}
					serverSettings={props.serverSettings}
					showMessage={props.showMessage}
				/>
			))}
		</tbody>
	);
}

function TableRow(props) {
	const [distances, setDistances] = useState();
	const name = props.place.name ? props.place.name : "-";
	const location = latLngToText(props.place);
	const placeList = buildPlacesList(props.places);
	const request = buildRequest(placeList, 3,958);
	sendDistanceRequest(request, setDistances, props.serverSettings, props.showMessage);
	const distance = distances;
	const units = 'mi' // at some point need to be dynamic
	return (
		<tr>
			<th scope="row">{props.index + 1}</th>
			<td>
				{name}
				<br />
				<small className="text-muted">{location}</small>
				<br />
				<small className="text-muted">Distance: {distance} {units}</small>
			</td>				
				
			<td>
				<PlaceActionsDropdown
					placeActions={props.placeActions}
					index={props.index}
				/>
			</td>
		</tr>
	);
}

function buildPlacesList(places){
	let placeList = []
	places.forEach(place => {
		let newPlace = {
			latitude: String(place.lat),
			longitude: String(place.lng)
		}
		placeList.push(newPlace);
	});
	return placeList;
}

function buildRequest(places, radius){
	return {
		requestType: "distances",
		places: places,
		earthRadius: radius,
	};
}

async function sendDistanceRequest(request, setDistances, serverSettings, showMessage) {
	const distanceResponse = await sendAPIRequest(request, serverSettings.serverUrl);
	if (distanceResponse && isJsonResponseValid(distanceResponse, distanceResponse)) {
		setDistances(distanceResponse["distances"]);
	} else {
		showMessage(
			`Distance request to ${serverUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}
import React, { useState } from "react";
import { Collapse, Container, Table } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { latLngToText, placeToLatLng } from "../../../utils/transformers";
import { useToggle } from "../../../hooks/useToggle";

export function SearchResults(props) {
	const [onStart, toggleOnStart] = useToggle(false);

	let places;
	if (props.places) {
		places = Object.values(props.places);
		if (!onStart) {
			toggleOnStart();
		}
	} else {
		places = [];
	}

	return (
		<Container>
			<Collapse isOpen={!onStart}>
				<ShowOnStart />
			</Collapse>
			<Collapse isOpen={onStart}>
				<Table responsive striped>
					<Body append={props.append} places={places} />
				</Table>
			</Collapse>
		</Container>
	);
}

function ShowOnStart() {
	return (
		<Container>
			<div>
				<p>Search to get Started.</p>
			</div>
		</Container>
	);
}

function Body(props) {
	return props.places.length > 0 ? (
		<tbody data-testid="searchResults"> 
			{props.places.map((place, index) => (
				<TableRow
					key={`table-${JSON.stringify(place)}-${index}`}
					place={place}
					append={props.append}
				/>
			))}
		</tbody>
	) : (
		<tbody>
			<tr>
				<td>No Results Found.</td>
			</tr>
		</tbody>
	);
}

function addItem(append, place, setAdded) {
	append(place);
	setAdded(true);
}

function TableRow(props) {
	const [added, setAdded] = useState(false);
	const name = props.place.name ? props.place.name : "-";
	const location = latLngToText(placeToLatLng(props.place));

	return !added ? (
		<tr onClick={() => addItem(props.append, props.place, setAdded)}>
			<td>
				{name}
				<br />
				<small className="text-muted">{location}</small>
			</td>
			<td>
				<FaPlus />
			</td>
		</tr>
	) : null;
}

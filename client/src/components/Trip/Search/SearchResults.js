import React, { useState } from "react";
import { Collapse, Container, Table } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { latLngToText } from "../../../utils/transformers";
import { useToggle } from "../../../hooks/useToggle";

export function SearchResults(props) {
	const [resultsFound, toggleResults] = useToggle(false);

	let places;
	if (props.places) {
		places = Object.values(props.places);
		if (!resultsFound) {
			toggleResults();
		}
	} else {
		places = [];
	}

	return (
		<Container>
			<Collapse isOpen={!resultsFound}>
				<ShowNoResults />
			</Collapse>
			<Collapse isOpen={resultsFound}>
				<Table responsive striped>
					<Body
						append={props.append}
						places={places}
						toggleResults={toggleResults}
					/>
				</Table>
			</Collapse>
		</Container>
	);
}

function ShowNoResults() {
	return (
		<Container>
			<div>
				<h3>No Results Found.</h3>
			</div>
		</Container>
	);
}

function Body(props) {
	return (
		<tbody>
			{props.places.map((place, index) => (
				<TableRow
					key={`table-${JSON.stringify(place)}-${index}`}
					lat={parseFloat(place.latitude)}
					lng={parseFloat(place.longitude)}
					name={place.name}
					place={place}
					append={props.append}
				/>
			))}
		</tbody>
	);
}

function addItem(append, place, setAdded) {
	append(place);
	setAdded(true);
}

function TableRow(props) {
	const name = props.name ? props.name : "-";
	const location = latLngToText(props);

	const [added, setAdded] = useState(false);

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

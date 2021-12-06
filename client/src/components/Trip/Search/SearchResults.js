import React, { useEffect, useState } from "react";
import { Collapse, Container, Table } from "reactstrap";
import { FaPlus } from "react-icons/fa";

export function SearchResults(props) {
	const [onStart, toggleOnStart] = useState(!props.noResultsFound && !props.places.length && props.searchMode.toLowerCase() === 'search');

	useEffect(()=>{
		toggleOnStart(!props.noResultsFound && !props.places.length && props.searchMode.toLowerCase() === 'search');
	},[props.places, props.noResultsFound]);

	return (
		<Container>
			<Collapse isOpen={onStart}>
				<ShowOnStart />
			</Collapse>
			<Collapse style={{overflow:'scroll', height:'17em'}} isOpen={!onStart}>
				<Table responsive striped>
					<Body append={props.append} places={props.places} noResultsFound={props.noResultsFound} found={props.found}/>
				</Table>
			</Collapse>
		</Container>
	);
}

function ShowOnStart() {
	return (
		<p className="centered">Search to get Started.</p>
	);
}

function Body(props) {
	return !props.noResultsFound ? (
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

	return !added ? (
		<tr onClick={() => addItem(props.append, props.place, setAdded)}>
			<td>
				{name}{props.place.municipality ? `, ${props.place.municipality}` : null}
				{props.place.region ? `, ${props.place.region}` : null}{props.place.country ? `, ${props.place.country}` : null}
			</td>
			<td>
				<FaPlus />
			</td>
		</tr>
	) : null;
}

import React, { useState } from "react";
import { Table, Container, Row, Col, Collapse } from "reactstrap";
import { latLngToText } from "../../../utils/transformers";
import { FaHome, FaTrashAlt, FaSearch, FaToolbox, FaMapSigns } from "react-icons/fa";
import { useToggle } from "../../../hooks/useToggle";
import Search from "../Search/Search";
import { PlaceActionsDropdown } from "./actions.js";
import TripToolbox from "./TripToolbox";

export default function Itinerary(props) {
	const [showSearch, toggleSearch] = useToggle(false);
	const [showToolbox, toggleToolbox ] = useToggle(false);

	return (
		<Container>
			<Header
				placeActions={props.placeActions}
				showMessage={props.showMessage}
				showToolbox = {showToolbox}
				toggleToolbox = {toggleToolbox}
				toggleSearch={toggleSearch}
				disableSearch={props.disableSearch}
			/>
			<hr />
			<Collapse isOpen={showSearch}>
				<Search
					serverSettings={props.serverSettings}
					append={props.placeActions.append}
					showMessage={props.showMessage}
				/>
			</Collapse>	
			<TotalDistances distances={props.distances}/>		
			<Table responsive striped>
				<Body
					distances={props.distances}
					places={props.places}
					placeActions={props.placeActions}
				/>
			</Table>
			<TotalDistances distances={props.distances}/>
			
		</Container>
	);
}

function Header(props) {
	let toolboxMethods = {
		append: props.placeActions.append,
		removeAll: props.placeActions.removeAll,
		showMessage: props.showMessage
	};
	return (
		<Row>
			<Col>
				<Row>
					<h4>
						My Trip&nbsp;&nbsp;					
						<FaToolbox onClick={()=>{props.toggleToolbox();}}/>
					</h4>
				</Row>
			</Col>
			<Col>
				<div className="float-right">
					<FaHome
						size={24}
						onClick={() => {
							props.placeActions.moveToHome();
						}}
						data-testid="home-button"
					/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<FaSearch
						className={props.disableSearch ? "fa-disabled" : ""}
						size={24}
						onClick={props.disableSearch ? null : props.toggleSearch}
					/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<FaTrashAlt
						size={24}
						onClick={() => props.placeActions.removeAll()}
						data-testid="delete-all-button"
					/>
				</div>
			</Col>

			<TripToolbox toolboxMethods={toolboxMethods} isOpen={props.showToolbox} toggleToolbox={props.toggleToolbox}/>			
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
					distances={props.distances}
				/>
			))}
		</tbody>
	);
}

function TableRow(props) {
	const name = props.place.name ? props.place.name : "-";
	const location = latLngToText(props.place);

	const distance = parseDistance(props.distances, props.index);
	const units = "mi"; // at some point need to be dynamic

	return (
		<tr>
			<th scope="row">{props.index + 1}</th>
			<td>
				{name}
				{ props.distances ?
				<Container>
					<br />
					<small>
						<strong>One Way Distance: {distance} {units}</strong>
					</small>
				</Container>
				: null
				}

				<br />
				<small className="text-muted">{location}</small>
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
function parseDistance(distances, index) {
	if (distances == undefined || index == 0) {
		return 0;
	} else {
		return totalDistance(distances.slice(0, index));
	}
}

function TotalDistances(props)
{
	if(props.distances){
		const total = totalDistance(props.distances);
		return (
			<Container>
				<h5><FaMapSigns />{" "}<strong>Total Trip Distance: {total}</strong></h5>
			</Container>
		);
	}else{
		return(
			null
		);
	}
	
}

function totalDistance(distances)
{
	let total = 0;

	for (let i = 0; i < distances.length; i++)
	{
		total += distances[i];
	}
	return total;
	
}

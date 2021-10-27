import  React, { useState } from "react";
import { Table, Container, Row, Col, Collapse, Input } from "reactstrap";
import { latLngToText, placeToLatLng } from "../../../utils/transformers";
import { FaHome, FaTrashAlt, FaSearch, FaToolbox, FaMapSigns, FaTrash } from "react-icons/fa";
import { useToggle } from "../../../hooks/useToggle";
import Search from "../Search/Search";
import TripToolbox, { formatPlaces } from "./TripToolbox";

export default function Itinerary(props) {
	const [showSearch, toggleSearch] = useToggle(false);
	const [showToolbox, toggleToolbox ] = useToggle(false);
	const revert = {
		places: formatPlaces(props.places),
		distances: props.distances
	};

	return (
		<Container>
			<Header
				placeActions={props.placeActions}
				showMessage={props.showMessage}
				showToolbox = {showToolbox}
				toggleToolbox = {toggleToolbox}
				toggleSearch={toggleSearch}
				disableSearch={props.disableSearch}
				places={props.places}
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
	const [tripName , setTripName] = useState("My Trip")
	let toolboxMethods = {
		append: props.placeActions.append,
		removeAll: props.placeActions.removeAll,
		showMessage: props.showMessage,
		setTripName: setTripName
	};
	
	return (
		<Row>
			<Col>
				<Row>
					<Col>
						<h4>	
							<Input value={tripName} data-testid="My Trip" placeholder={tripName} onChange={e => setTripName(e.target.value)}></Input>				
						</h4>
					</Col>
					<FaToolbox data-testid="toolbox-btn" size={24} onClick={()=>{props.toggleToolbox();}}/>
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
						data-testid="srch-button"
					/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<FaTrashAlt
						size={24}
						onClick={() => props.placeActions.removeAll()}
						data-testid="delete-all-button"
					/>
				</div>
			</Col>

			<TripToolbox tripName={tripName} toolboxMethods={toolboxMethods} isOpen={props.showToolbox} toggleToolbox={props.toggleToolbox} places={props.places}/>			
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
	const location = latLngToText(placeToLatLng(props.place));

	const distance = parseDistance(props.distances, props.index);
	const units = "mi"; // at some point need to be dynamic

	return (
		<tr>
			<th scope="row">{props.index + 1}</th>
			<td>
				{name}
				<br />
				{ props.distances ?
					<small>
						<strong>One Way Distance: {distance} {units}</strong>
					</small>
				: null
				}
				<br />
				<small className="text-muted">{location}</small>
			</td>

			<td>
				<FaTrash onClick={() => props.placeActions.removeAtIndex(props.index)} data-testid={`delete-button-${props.index}`}/>
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

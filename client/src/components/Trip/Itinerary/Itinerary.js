import  React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Collapse, Input, ListGroup } from "reactstrap";
import { latLngToText, placeToLatLng } from "../../../utils/transformers";
import { FaHome, FaTrashAlt, FaSearch, FaToolbox, FaMapSigns, FaTrash } from "react-icons/fa";
import { MdDragHandle } from "react-icons/md";
import { useToggle } from "../../../hooks/useToggle";
import Search from "../Search/Search";
import TripToolbox from "./TripToolbox";
import TripActions from "./TripActions";
import {
	sortableContainer,
	sortableElement,
	sortableHandle,
  } from 'react-sortable-hoc';
import { reverseGeocode } from "../../../utils/reverseGeocode";

export default function Itinerary(props) {
	const [showSearch, toggleSearch] = useToggle(false);
	const [showToolbox, toggleToolbox ] = useToggle(false);
	const [tripName , setTripName] = useState("My Trip");
	return (
		<Container>
			<Header
				tripName={tripName}
				setTripName={setTripName}
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
			<TripHeader
				tripName={tripName} 
				undo={props.placeActions.undo} 
				distances={props.distances} 
				places={props.places}
				disableTour={props.disableTour} 
				serverSettings={props.serverSettings} 
				bulkAppend={props.placeActions.bulkAppend} 
				showMessage={props.showMessage}/>
			<br />		
			<Table responsive striped>
				<Body
					distances={props.distances}
					places={props.places}
					placeActions={props.placeActions}
				/>
			</Table>
			{props.distances ? <TotalDistances distances={props.distances} /> : null}
		</Container>
	);
}

function Header(props) {
	let toolboxMethods = {
		bulkAppend: props.placeActions.bulkAppend,
		removeAll: props.placeActions.removeAll,
		showMessage: props.showMessage,
		setTripName: props.setTripName
	};
	
	return (
		<Row>
			<Col>
				<Row>
					<Col>
						<h4>	
							<Input value={props.tripName} data-testid="My Trip" placeholder={props.tripName} onChange={e => props.setTripName(e.target.value)}></Input>				
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

			<TripToolbox tripName={props.tripName} toolboxMethods={toolboxMethods} isOpen={props.showToolbox} toggleToolbox={props.toggleToolbox} places={props.places}/>			
		</Row>
	);
}

const DragHandle = sortableHandle(() => <MdDragHandle size={30}/>);

function splitName(placeName){
	let seperated = placeName.split(',');

	if(isNaN(seperated[0])){
		return seperated;
	}else{
		const temp = seperated[0] + seperated[1];
		seperated[0] = temp;
		seperated.splice(1, 1);
		return seperated;
	}
}

function placeHasName(placeName){
	return placeName;
}

const SortableItem = sortableElement( props  => {
	const[seperatedName, setSeperatedName] = useState(placeHasName(props.place.name) ? splitName(props.place.name) : ["-"]);
	const[name, setName] = useState(seperatedName[0]);
	useEffect(()=>{
		setName(seperatedName[0]);
	},[seperatedName]);
	const [,...nameArr] = seperatedName;
	const location = latLngToText(placeToLatLng(props.place));
	const distance = parseDistance(props.distances, props.id);
	const units = "mi"; // at some point need to be dynamic
	const numRow = .1;
	const [rowClicked, setRowClicked] = useToggle(false);
	return (
		<tr>
			<th>
				<DragHandle style={{width: numRow + 'em'}}/>
			</th>
			<td style={{width: 100 + '%'}} onClick={()=> clickedRow(props.place, setRowClicked, seperatedName, setSeperatedName)}> 
				{name}{rowClicked && nameArr.length > 0 ? ',' + nameArr.join(',') : ''}
				<br />
				<Collapse isOpen={rowClicked}>
					{ props.distances ?
						<small>
							<strong>One Way Distance: {distance} {units}</strong>
						</small>
					: null
					}
					<br />
					<small className="text-muted">{location}</small>
				</Collapse>
			</td>
			<td style={{width: numRow + 'em'}}>
				<FaTrash onClick={() => props.placeActions.removeAtIndex(props.id)} data-testid={`delete-button-${props.id}`}/>
			</td>
		</tr>
	);
})

async function clickedRow(place, setRowClicked, seperatedName, setSeperatedName){
	if(seperatedName.length === 1){
		const fullName = await reverseGeocode(placeToLatLng(place));
		setSeperatedName(splitName(`${placeHasName(place.name) ? place.name : ''}${fullName.name !== 'Unknown' ? ', ' + fullName.name : ', Unknown Place'}`));
	}
	setRowClicked();
}

const SortableContainer = sortableContainer(({children}) => {
	return <ListGroup>{children}</ListGroup>;
  });


function Body(props) {
	const [places, setPlace] = useState(props.places);
	let onSortEnd = ({oldIndex, newIndex}) => {
		  let newplace = arrayMove(props.places, oldIndex, newIndex)
		  setPlace(newplace)
		  props.placeActions.bulkAppend(newplace) 
		};
	let i = -1;
	return (
		<tbody>
			<SortableContainer onSortEnd={onSortEnd} useDragHandle>
			{props.places.map((place,index) => (
				i++,
			  <SortableItem 					
					key={`table-${JSON.stringify(place)}-${index}`}
					place={place}
					placeActions={props.placeActions}
					index={index}
					places={props.places}
					distances={props.distances} 
					id={i}
					lockToContainerEdges={true}
					/>
			))}
		  	</SortableContainer>
		</tbody>
		  );
}

function arrayMoveMutable(array, fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

		const [item] = array.splice(fromIndex, 1);
		array.splice(endIndex, 0, item);
	}
}

function arrayMove(array, fromIndex, toIndex) {
	array = [...array];
	arrayMoveMutable(array, fromIndex, toIndex);
	return array;
}

function parseDistance(distances, index) {
	if (distances == undefined || index == 0) {
		return 0;
	} else {
		return totalDistance(distances.slice(0, index));
	}
}

function TripHeader(props){
	return(
	<Row>
		<Col>
			{props.distances ? <TotalDistances distances={props.distances} /> : null}
		</Col>
			{props.places.length > 0 ?
			<TripActions
				tripName={props.tripName}
				disableTour={props.disableTour}
				distances={props.distances} 
				places={props.places} 
				serverSettings={props.serverSettings} 
				bulkAppend={props.bulkAppend} 
				undo={props.undo}
				showMessage={props.showMessage}/>
			: null}
	</Row>
	);
}

function TotalDistances(props)
{
	const total = totalDistance(props.distances)
	return (
		<Row>
			<Col>
				<h5><FaMapSigns />{" "}<strong>Total Trip Distance: {total}</strong></h5>
			</Col>
			
		</Row>
	);
	
}

export function totalDistance(distances)
{
	let total = 0;

	for (let i = 0; i < distances.length; i++)
	{
		total += distances[i];
	}
	return total;
}	

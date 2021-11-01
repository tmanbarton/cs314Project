import  React, { useState } from "react";
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
import { LOG } from "../../../utils/constants";

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
			<TotalDistances 
				undo={props.placeActions.undo} 
				distances={props.distances} 
				places={props.places} 
				serverSettings={props.serverSettings} 
				bulkAppend={props.placeActions.bulkAppend} 
				showMessage={props.showMessage}/>		
			<Table responsive striped>
				<Body
					distances={props.distances}
					places={props.places}
					placeActions={props.placeActions}
				/>
			</Table>
			{props.distances ?
				<TotalDistances 
				undo={props.placeActions.undo} 
				distances={props.distances} 
				places={props.places} 
				serverSettings={props.serverSettings} 
				bulkAppend={props.placeActions.bulkAppend} 
				showMessage={props.showMessage}/>	
			: null}
		</Container>
	);
}

function Header(props) {
	const [tripName , setTripName] = useState("My Trip")
	let toolboxMethods = {
		bulkAppend: props.placeActions.bulkAppend,
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

const DragHandle = sortableHandle(() => <MdDragHandle size={30}/>);

const SortableItem = sortableElement( props  => {
	const name = props.place.name ? props.place.name : "-";
	const location = latLngToText(placeToLatLng(props.place));
	const distance = parseDistance(props.distances, props.id);
	const units = "mi"; // at some point need to be dynamic
	const numRow = .1
	return (
		<tr>
			<th>
			<DragHandle style={{width: numRow + 'em'}}/>
			</th>
			<th scope="row" style={{width: numRow + 'em'}}> 
				{props.id + 1}
			</th>
			<td style={{width: 100 + '%'}}> 
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
			<td style={{width: numRow + 'em'}}>
				<FaTrash onClick={() => props.placeActions.removeAtIndex(props.id)} data-testid={`delete-button-${props.id}`}/>
			</td>
		</tr>
	);
})

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
	LOG.info(props.places)
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

function TotalDistances(props)
{
	if(props.distances){
		const total = totalDistance(props.distances);
		return (
			<Row>
				<Col>
					<h5><FaMapSigns />{" "}<strong>Total Trip Distance: {total}</strong></h5>
				</Col>
				<TripActions distances={props.distances} places={props.places} serverSettings={props.serverSettings} bulkAppend={props.bulkAppend} undo={props.undo}/>
			</Row>
		);
	}else{
		return(
			<Row>
				<Col>
				</Col>
				<TripActions distances={props.distances} places={props.places} serverSettings={props.serverSettings} bulkAppend={props.bulkAppend} undo={props.undo}/>
			</Row>
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

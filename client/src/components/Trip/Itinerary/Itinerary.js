import  React, { useEffect, useState, useRef } from "react";
import { Table, Container, Row, Col, Collapse, ListGroup, ButtonGroup, Button } from "reactstrap";
import { placeToLatLng } from "../../../utils/transformers";
import { FaLocationArrow, FaCheckSquare, FaWindowClose, FaSearch, FaSave, FaMapSigns, FaTrash, FaChevronRight, FaChevronDown, FaEdit } from "react-icons/fa";
import { MdDragHandle } from "react-icons/md";
import { useToggle } from "../../../hooks/useToggle";
import Search from "../Search/Search";
import TripManager from "./TripManager";
import TripActions from "./TripActions";
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import { reverseGeocode } from "../../../utils/reverseGeocode";

const csuGold = '#C8C372';
const csuSuccess = "#105456";
const csuWarning = "#ECC530";

export default function Itinerary(props) {
	const [showSearch, toggleSearch] = useToggle(false);
	const [showManager, toggleManager ] = useToggle(false);
	const [tripName , setTripName] = useState("My Trip");
	const [changedTrip, setChangedTrip] = useState(false);
	return (
		<Container>
			<Header mapRef={props.mapRef} tripName={tripName} setTripName={setTripName} placeActions={props.placeActions} showMessage={props.showMessage} showManager={showManager} toggleManager={toggleManager} toggleSearch={toggleSearch} disableSearch={props.disableSearch} places={props.places} distances={props.distances} disableTour={props.disableTour} changedTrip={changedTrip} setChangedTrip={setChangedTrip} serverSettings={props.serverSettings} selectedIndex={props.selectedIndex}/>
			<hr />
			<Collapse isOpen={showSearch}>
				<Search serverSettings={props.serverSettings} append={props.placeActions.append} showMessage={props.showMessage} showSearch={showSearch}/>
				<hr hidden={true}/>
			</Collapse>	
			{props.distances ? <TripHeader setChangedTrip={setChangedTrip} changedTrip={changedTrip} undo={props.placeActions.undo} distances={props.distances} /> : null}	
			<Table responsive striped>
				<Body distances={props.distances} places={props.places} placeActions={props.placeActions} selectedIndex={props.selectedIndex} setSelectedIndex={props.setSelectedIndex}/>
			</Table>
			{props.distances ? <TotalDistances distances={props.distances} /> : null}
		</Container>
	);
}

function Header(props) {	
	const managerMethods = { bulkAppend: props.placeActions.bulkAppend, mapRef: props.mapRef, removeAll: props.placeActions.removeAll, showMessage: props.showMessage, setTripName: props.setTripName};
	return (
		<Row>
			<Col>
				<h4>	
					<EditableInput className="tripText" text={props.tripName} setText={props.setTripName}/>			
				</h4>
			</Col>
			<ButtonGroup size="sm" className="button-group">
				<TripManager places={props.places} tripName={props.tripName} className="makeWider" managerMethods={managerMethods}/>
				<Button color="primary" data-testid="home-button" onClick={() => {props.placeActions.moveToHome();}}><FaLocationArrow size={18} /><p className="button-label">Locate</p></Button>
				<Button color="primary" data-testid="srch-button" className={props.disableSearch ? "fa-disabled" : ""} onClick={props.disableSearch ? null : props.toggleSearch}>
					<FaSearch size={18} />
					<p className="button-label">Search</p>
				</Button>
				{props.places.length && !props.changedTrip ? 
					<TripActions mapRef={props.mapRef} selectedIndex={props.selectedIndex} tripName={props.tripName} disableTour={props.disableTour} distances={props.distances}  places={props.places}  serverSettings={props.serverSettings}  bulkAppend={props.placeActions.bulkAppend} undo={props.placeActions.undo} showMessage={props.showMessage} removeAll={props.placeActions.removeAll} setChangedTrip={props.setChangedTrip} />
				: null}
			</ButtonGroup>		
		</Row>
	);
}


export function EditableInput(props){
	const inputRef = useRef(null);
	const [inputVisible, setInputVisible] = useState(false);

	function onClickOutSide(e) {
		if (inputRef.current && !inputRef.current.contains(e.target)) {
		  setInputVisible(false);
		}
	  }

	  useEffect(() => {
		if (inputVisible) {
		  document.addEventListener("mousedown", onClickOutSide);
		}
		return () => {
		  document.removeEventListener("mousedown", onClickOutSide);
		};
	  });

	  return (
		<React.Fragment>
		  {inputVisible ? (
			<input
			data-testid="Trip Text"
    		  className="tripText"
			  style = {{ width: '99%' }}
			  ref={inputRef} // Set the Ref
			  value={props.text} // Now input value uses local state
			  onChange={e => {
				props.setText(e.target.value);
			  }}
			/>
		  ) : (
			<span data-testid="My Trip" className="tripText" onClick={() => setInputVisible(true)}>{props.text}<FaEdit style={{paddingLeft: ".25em"}} hidden={inputVisible}/></span>
		  )}
		</React.Fragment>
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
	const distance = parseDistance(props.distances, props.id);
	const numRow = .1;
	const units = 'mi'; // at some point need to be dynamic
	const [rowClicked, setRowClicked] = useToggle(false);
	const rowStates = {
		setRowClicked: setRowClicked,
		setSeperatedName: setSeperatedName,
		seperatedName: seperatedName,
		setSelectedIndex: props.setSelectedIndex,
		index: props.id,
		place: props.place
	}
	return (
		<tr style={{backgroundColor: props.selectedIndex === props.id ? csuGold : ''}} onClick={()=> clickedRow(rowStates)}>
			<th>
				<DragHandle style={{width: numRow + 'em'}}/>
			</th>
			<td style={{width: 100 + '%'}}> 
				{name}{rowClicked && nameArr.length > 0 ? ',' + nameArr.join(',') : ''}
				<br />
				<Collapse isOpen={rowClicked}>
					{ props.distances ?
						<small>
							<strong>Distance so far: {distance.toLocaleString()} {units}</strong>
						</small>
					: null}
				</Collapse>
			</td>
			<td style={{width: numRow + 'em'}}>
				<DeletePlace removeAtIndex={props.placeActions.removeAtIndex} index={props.id} rowClicked={rowClicked}/>
			</td>
			<td style={{width: numRow + 'em'}}>
				<ArrowIcon rowClicked={rowClicked}/>		
			</td>
		</tr>
	);
})
function DeletePlace(props){
	return props.rowClicked ? <FaTrash onClick={() => props.removeAtIndex(props.index)} data-testid={`delete-button-${props.id}`} /> : null;
}
function ArrowIcon(props){
	return props.rowClicked ? <FaChevronDown size={10}/> : <FaChevronRight size={10}/>
}
async function clickedRow(rowStates){
	if(rowStates.seperatedName.length === 1){
		const fullName = await reverseGeocode(placeToLatLng(rowStates.place));
		rowStates.setSeperatedName(splitName(`${placeHasName(rowStates.place.name) ? rowStates.place.name : ''}${fullName.name !== 'Unknown' ? ', ' + fullName.name : ', Unknown Place'}`));
	}
	rowStates.setSelectedIndex(rowStates.index);
	rowStates.setRowClicked();
}

const SortableContainer = sortableContainer(({children}) => {
	return <ListGroup>{children}</ListGroup>;
  });


function Body(props) {
	const [places, setPlace] = useState(props.places);
	let onSortEnd = ({oldIndex, newIndex}) => {
		  let newplace = arrayMove(props.places, oldIndex, newIndex);
		  const selectedPlace = props.places[props.selectedIndex];
		  setPlace(newplace);
		  props.placeActions.bulkAppend(newplace, newplace.indexOf(selectedPlace)); 
		};
	let i = -1;
	return (
		<tbody>
			<SortableContainer onSortEnd={onSortEnd} useDragHandle useWindowAsScrollContainer>
			{props.places.map((place,index) => (
				i++,
			  <SortableItem 					
					key={`table-${JSON.stringify(place)}-${index}`} place={place} placeActions={props.placeActions} index={index} places={props.places}
					distances={props.distances} selectedIndex={props.selectedIndex} setSelectedIndex={props.setSelectedIndex} id={i} lockToContainerEdges={true}
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

function TripHeader(props){
	return(
	<Row>
		<Col>
			{props.distances ? <TotalDistances distances={props.distances} /> : null}
		</Col>
		{props.changedTrip ? 
			<ConfirmAction setChangedTrip={props.setChangedTrip} undo={props.undo}/>
		: null}
		<hr />
	</Row>
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
	const total = totalDistance(props.distances)
	const units = "miles"; // at some point need to be dynamic
	return (
		<h5><FaMapSigns />{" "}<strong>Total Trip Distance: {total.toLocaleString()} {units}</strong></h5>
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

function ConfirmAction(props){
    return(
        <div className="float-right">
            <Col>
                <p><strong>Confirm Changes?</strong></p>
                <Col>
                    <div>
                        <FaCheckSquare data-testid="save-btn" color={csuSuccess} size={30} onClick={()=>props.setChangedTrip(false)} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FaWindowClose data-testid="undo-btn" color={csuWarning} size={30} onClick={()=> revertTrip(props.setChangedTrip, props.undo)} />
                    </div>
                </Col>                
            </Col>
        </div>
    );
}

function revertTrip(setChangedTrip, undo){
    undo();
    setChangedTrip(false);
}
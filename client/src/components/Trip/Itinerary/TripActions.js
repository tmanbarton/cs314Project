import  React, {useState} from "react";
import { ButtonGroup, Collapse, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown, Button } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { formatPlaces } from "../../../utils/transformers";
import { IoIosSpeedometer } from "react-icons/io";
import { FaAngleDoubleLeft, FaSortAlphaDown, FaCheckSquare, FaWindowClose } from "react-icons/fa"
import { ImShuffle } from "react-icons/im"
import { EARTH_RADIUS_UNITS_DEFAULT, DEFAULT_RESPONSE_TIME } from "../../../utils/constants";
import { isJsonResponseValid, SCHEMAS, sendAPIRequest } from "../../../utils/restfulAPI";
import { buildDistanceRequest, sendDistanceRequest } from "../../../hooks/usePlaces";
import { totalDistance } from "./Itinerary";

const csuSuccess = "#105456";
const csuWarning = "#ECC530";

export default function TripActions(props){
    const [changedTrip, setChangedTrip] = useState(false);
    const tripObject = buildTripObject(props.places, props.distances);
    return (
        <Row>
            <Collapse isOpen={changedTrip}>
                <ConfirmAction setChangedTrip={setChangedTrip} undo={props.undo}/>
            </Collapse>
            <Collapse data-testid="dropdown" isOpen={!changedTrip}>
                <ActionsDropdown>
                    <DropdownItem disabled={props.disableTour}>
                        <IoIosSpeedometer data-testid="optimize" onClick={()=> optimizeTrip(tripObject,{bulkAppend: props.bulkAppend, serverSettings: props.serverSettings, showMessage: props.showMessage, tripName: props.tripName}, setChangedTrip)} size={24}/>
                    </DropdownItem>
                    <DropdownItem>
                        <FaSortAlphaDown data-testid="alphasort" onClick={()=> alphaSort(tripObject, {bulkAppend: props.bulkAppend}, setChangedTrip)} size ={24}/>
                    </DropdownItem>
                    <DropdownItem>
                        <ImShuffle data-testid="shuffleBtn" onClick={()=> shuffleTrip(tripObject, {bulkAppend: props.bulkAppend}, setChangedTrip)} size = {24}/>
                    </DropdownItem>
                    <DropdownItem>
                        <FaAngleDoubleLeft data-testid="reverse" onClick={()=> reversePlaces(tripObject, {bulkAppend: props.bulkAppend}, setChangedTrip)}  size = {24} />
                    </DropdownItem>
                </ActionsDropdown>
            </Collapse>
        </Row>

    );
}

function ConfirmAction(props){
    return(
        <Container>
            <Col>
                <p><strong>Save Changes?</strong></p>
                <Col>
                    <div>
                        <FaCheckSquare data-testid="save-btn" color={csuSuccess} size={30} onClick={()=>props.setChangedTrip(false)} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FaWindowClose data-testid="undo-btn" color={csuWarning} size={30} onClick={()=> revertTrip(props.setChangedTrip, props.undo)} />
                    </div>
                </Col>                
            </Col>
        </Container>
    );
}

function revertTrip(setChangedTrip, undo){
    undo();
    setChangedTrip(false);
}

function ActionsDropdown(props) {
    return (
        <UncontrolledDropdown direction="left">
            <DropdownToggle tag="div">
                <BiDotsVerticalRounded size="1.5em" />
            </DropdownToggle>
            <DropdownMenu>
                <ButtonGroup>
                    {props.children}
                </ButtonGroup>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

function optimizeTrip(tripObject, apiObject, setChangedTrip){
    sendTourRequest(buildTourRequest(tripObject.places), apiObject, tripObject, setChangedTrip);
}

function buildTripObject(places, distances){
    return {
        places: formatPlaces(places),
        distances: distances
    }
}

function buildTourRequest(places){
    return {
        requestType: "tour",
        earthRadius: EARTH_RADIUS_UNITS_DEFAULT.miles,
        response: DEFAULT_RESPONSE_TIME,
        places: places
    };
}

function evaluateOptimization(apiObject, diffTotal, setChangedTrip, optimizedPlaces){
    if(diffTotal !== 0){
        apiObject.showMessage(`Successfully optimized ${apiObject.tripName}. Saved ${diffTotal} miles!`, "success");
        apiObject.bulkAppend(optimizedPlaces);
        setChangedTrip(true);
    }else{
        apiObject.showMessage(`${apiObject.tripName} is already optimized!`, "info");
        setChangedTrip(false);
    }
    
}

async function sendTourRequest(request, apiObject, tripObject, setChangedTrip){
    const prevTotal = totalDistance(tripObject.distances);
    const tourResponse = await sendAPIRequest(request, apiObject.serverSettings.serverUrl);
    if(tourResponse && isJsonResponseValid(tourResponse, SCHEMAS.tour)){
        const newTotal = totalDistance(await sendDistanceRequest(buildDistanceRequest(tourResponse.places, EARTH_RADIUS_UNITS_DEFAULT.miles), null, apiObject.serverSettings, apiObject.showMessage, true));
        const diffTotal = Math.abs(prevTotal - newTotal);
        evaluateOptimization(apiObject, diffTotal, setChangedTrip, tourResponse.places);
    }else{
        apiObject.showMessage(
			`Tour request to ${apiObject.serverSettings.serverUrl} failed. Check the log for more details.`,
			"error"
		);
        setChangedTrip(false);
    }    
}
function reversePlaces(tripObject, bulkAppend, setChangedTrip) {
    
    if(tripObject.places.length > 2){
        tripObject.places.push(tripObject.places[0]) 
        tripObject.places.shift();   
        tripObject.places.reverse();
        bulkAppend.bulkAppend(tripObject.places)
        setChangedTrip(true);
    }
    
}

function alphaSort(tripObject, bulkAppend, setChangedTrip) {
    
    tripObject.places.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    bulkAppend.bulkAppend(tripObject.places);
    setChangedTrip(true);
    
    
}

function shuffleTrip(tripObject, bulkAppend, setChangedTrip) {
    
    let currentIndex = tripObject.places.length,  randomIndex;
    
    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [tripObject.places[currentIndex], tripObject.places[randomIndex]] = [
        tripObject.places[randomIndex], tripObject.places[currentIndex]];
    }

    bulkAppend.bulkAppend(tripObject.places);
    setChangedTrip(true);
    
}

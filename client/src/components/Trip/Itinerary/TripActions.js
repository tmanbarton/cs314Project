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

export default function TripActions(props){
    const [changedTrip, setChangedTrip] = useState(false);

    return (
        <Row>
            <Collapse isOpen={changedTrip}>
                <ConfirmAction setChangedTrip={setChangedTrip} undo={props.undo}/>
            </Collapse>
            <Collapse data-testid="dropdown" isOpen={!changedTrip}>
                <ActionsDropdown>
                    <DropdownItem disabled={props.disableTour}>
                        <IoIosSpeedometer data-testid="optimize" onClick={()=> optimizeTrip(buildTripObject(props.places, props.distances),{bulkAppend: props.bulkAppend, serverSettings: props.serverSettings, showMessage: props.showMessage}, setChangedTrip)} size={24}/>
                    </DropdownItem>
                    <DropdownItem>
                        <FaSortAlphaDown onClick={()=> alphaSort(props.places, {bulkAppend: props.bulkAppend}, setChangedTrip)} size ={24}/>
                    </DropdownItem>
                    <DropdownItem>
                        <ImShuffle onClick={()=> shuffleTrip(props.places, {bulkAppend: props.bulkAppend}, setChangedTrip)} size = {24}/>
                    </DropdownItem>
                    <DropdownItem>
                        <FaAngleDoubleLeft onClick={()=> reversePlaces(props.places, {bulkAppend: props.bulkAppend}, setChangedTrip)}  size = {24} />
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
                        <FaCheckSquare data-testid="save-btn" className="success" size={30} onClick={()=>props.setChangedTrip(false)} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FaWindowClose data-testid="undo-btn" className="warning" size={30} onClick={()=> revertTrip(props.setChangedTrip, props.undo)} />
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
    sendTourRequest(buildTourRequest(tripObject.places), apiObject, setChangedTrip, tripObject);
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

async function sendTourRequest(request, apiObject, setChangedTrip, tripObject){
    const prevDistances = tripObject.distances;
    const tourResponse = await sendAPIRequest(request, apiObject.serverSettings.serverUrl);
    if(tourResponse && isJsonResponseValid(tourResponse, SCHEMAS.tour)){
        const newDistances = sendDistanceRequest(buildDistanceRequest(tripObject.places, EARTH_RADIUS_UNITS_DEFAULT.miles),apiObject.serverSettings.serverUrl, apiObject.showMessage);
        setChangedTrip(true);
        apiObject.showMessage(`Saved `);
        apiObject.bulkAppend(request.places);
    }else{
        apiObject.showMessage(
			`Tour request to ${apiObject.serverSettings.serverUrl} failed. Check the log for more details.`,
			"error"
		);
    }    
}

function reversePlaces(places, bulkAppend, setChangedTrip) {
    places.reverse();
    bulkAppend.bulkAppend(places);
    setChangedTrip(true);
}

function alphaSort(places, bulkAppend, setChangedTrip) {
    places.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    bulkAppend.bulkAppend(places);
    setChangedTrip(true);
}

function shuffleTrip(places, bulkAppend, setChangedTrip) {
    let currentIndex = places.length,  randomIndex;
    
    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [places[currentIndex], places[randomIndex]] = [
        places[randomIndex], places[currentIndex]];
    }

    bulkAppend.bulkAppend(places);
    setChangedTrip(true);
}
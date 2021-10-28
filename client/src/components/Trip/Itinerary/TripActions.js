import  React, {useState} from "react";
import { ButtonGroup, Collapse, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown, Button } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { formatPlaces } from "../../../utils/transformers";
import { IoIosSpeedometer, IoIosShuffle } from "react-icons/io";
import { BsSortAlphaDown } from "react-icons/bs";
import { EARTH_RADIUS_UNITS_DEFAULT, DEFAULT_RESPONSE_TIME } from "../../../utils/constants";
import { isJsonResponseValid, SCHEMAS, sendAPIRequest } from "../../../utils/restfulAPI";

export default function TripActions(props){
    const [revert, setRevert] = useState();
    const [changedTrip, setChangedTrip] = useState(false);

    return (
        <Row>

            <Collapse isOpen={!changedTrip}>
                <ActionsDropdown>
                    <DropdownItem>
                        <IoIosSpeedometer onClick={()=> optimizeTrip(setRevert, buildTripObject(props.places, props.distances),{bulkAppend: props.bulkAppend, serverSettings: props.serverSettings, showMessage: props.showMessage}, setChangedTrip)} size={24}/>
                    </DropdownItem>
                    <DropdownItem>
                        <BsSortAlphaDown size ={24}/>
                    </DropdownItem>
                    <DropdownItem>
                        <IoIosShuffle size = {24}/>
                    </DropdownItem>
                </ActionsDropdown>
            </Collapse>
        </Row>

    );
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

function optimizeTrip(setRevert, tripObject, apiObject, setChangedTrip){
    setRevert(tripObject);
    sendTourRequest(buildTourRequest(tripObject.places), apiObject, setChangedTrip);
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

async function sendTourRequest(request, apiObject, setChangedTrip){
    const tourResponse = await sendAPIRequest(request, apiObject.serverSettings.serverUrl);
    if(tourResponse && isJsonResponseValid(tourResponse, SCHEMAS.tour)){
        apiObject.bulkAppend(request.places);
        setChangedTrip(true);
        apiObject.showMessage();
    }else{
        apiObject.showMessage(
			`Tour request to ${apiObject.serverSettings.serverUrl} failed. Check the log for more details.`,
			"error"
		);
    }    
}

function reversePlaces(places) {
	return places.reverse();
}
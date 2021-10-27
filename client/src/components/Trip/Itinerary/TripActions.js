import  React from "react";
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { formatPlaces } from "../../../utils/transformers";

export default function TripActions(props){

    const revert = {
		places: formatPlaces(props.places),
		distances: props.distances
	};

    return (
        <ActionsDropdown>
            <DropdownItem>
                <p>BUTTONS GO HERE</p>
            </DropdownItem>
        </ActionsDropdown>
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
import React from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt } from 'react-icons/fa';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';

export function ItineraryActionsDropdown(props) {
    return (
        <ActionsDropdown>
            <DropdownItem onClick={() => props.placeActions.append(DEFAULT_STARTING_PLACE)}>
                <FaHome />
            </DropdownItem>
            <DropdownItem onClick={() => props.placeActions.removeAll()}>
                <FaTrashAlt />
            </DropdownItem>
        </ActionsDropdown>
    );
}

export function PlaceActionsDropdown(props) {
    return (
        <ActionsDropdown>
            <DropdownItem onClick={() => props.placeActions.removeAtIndex(props.index)}>
                <FaTrash />
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
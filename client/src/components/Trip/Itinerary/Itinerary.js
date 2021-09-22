import React from 'react';
import { Input, Table, Collapse, Container } from 'reactstrap';
import { latLngToText } from '../../../utils/transformers';
import { FaHome, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';
import { useToggle } from '../../../hooks/useToggle';

export default function Itinerary(props) {
    return (
        <Table responsive striped>
            <Header placeActions={props.placeActions} />
            <Body places={props.places} placeActions={props.placeActions} />
        </Table>
    );
}

function Header(props) {
    const [showSearch, toggleSearch] = useToggle(false);
    
    return (
        <thead>
            <tr>
                <th/>
                <th>My Trip</th>
                <th>
                    <FaHome onClick={() => props.placeActions.append(DEFAULT_STARTING_PLACE)} data-testid='home-button'/>
                </th>    
                <th>
                    <Search toggleSearch={toggleSearch}/>
                    <Container>
                        <Collapse isOpen={showSearch}>
                            <Input />
                        </Collapse>
                    </Container>
                </th>
                <th>
                    <FaTrashAlt onClick={() => props.placeActions.removeAll()} data-testid='delete-all-button'/>
                </th>
            </tr>
        </thead>
    );
}

function Search(props) {
    return (
        <>
            <FaSearch onClick={props.toggleSearch}/>
        </>
    );
}

function Body(props) {
    return (
        <tbody>
            {props.places.map((place, index) => 
                <TableRow 
                    key={`table-${JSON.stringify(place)}-${index}`}
                    place={place}
                    placeActions={props.placeActions}
                    index={index}
                />
            )}
        </tbody>
    );
}

function TableRow(props) {
    const name = props.place.name ? props.place.name : "-";
    const location = latLngToText(props.place);

    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>
                {name}
                <br/>
                <small className="text-muted">{location}</small>
            </td>
            <td>
                <FaTrashAlt onClick={() => props.placeActions.removeAtIndex(props.index)} data-testid={`delete-button-${props.index}`}/>
            </td>
        </tr>
    );
}
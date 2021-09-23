import React from 'react';
import { Table, Container, Row, Col, Collapse } from 'reactstrap';
import { latLngToText } from '../../../utils/transformers';
import { FaHome, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';
import { useToggle } from '../../../hooks/useToggle';
import Search from '../Search/Search';
import { PlaceActionsDropdown } from './actions.js';

export default function Itinerary(props) {
    const [showSearch, toggleSearch] = useToggle(false);
    return (
        <Container>
            <Header placeActions={props.placeActions} toggleSearch={toggleSearch}/>
            <hr />
            <Collapse isOpen={showSearch}>
                <Search />
            </Collapse>
            <Table responsive striped>
                <Body places={props.places} placeActions={props.placeActions} />
            </Table>
        </Container>
        
    );
}

function Header(props) {    
    return (
        <Row>
            <Col>
                <h4>My Trip</h4>
            </Col>
            <Col>
                <div className="float-right">
                    <FaHome size={24} onClick={() => props.placeActions.append(DEFAULT_STARTING_PLACE)} data-testid='home-button'/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FaSearch size={24} onClick={props.toggleSearch} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FaTrashAlt size={24} onClick={() => props.placeActions.removeAll()} data-testid='delete-all-button'/>
                </div>
            </Col>
        </Row>
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
                <PlaceActionsDropdown placeActions={props.placeActions} index={props.index} />
            </td>
        </tr>
    );
}
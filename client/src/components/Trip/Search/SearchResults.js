import React from 'react'
import { Collapse, Container , Table} from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import { latLngToText } from '../../../utils/transformers';
import { useToggle } from '../../../hooks/useToggle';


export function SearchResults(props) {
    const [resultsFound, toggleResults] = useToggle(false);

    let places;
    if(props.places){
        places = Object.values(props.places);
        if(!resultsFound){
            toggleResults();
        }
    }else{
        places = [];
    }

    return (
        <Container>
            <Collapse isOpen={!resultsFound}>
                <ShowNoResults />
            </Collapse>
            <Collapse isOpen={resultsFound}>
            <Table responsive striped>
                <Body places={places} toggleResults={toggleResults}/>
            </Table>
            </Collapse>
        </Container>
    );
}


function ShowNoResults() {
    return (
    <Container>
        <div>
            <h3>No Results Found.</h3>
        </div>
    </Container>
    );
}

function Body(props) {

    return (
        <tbody>
            {props.places.map((place, index) => 
                <TableRow 
                    lat = {parseFloat(place.latitude)}
                    lng = {parseFloat(place.longitude)}
                    name = {place.name}
                />
            )}
        </tbody>
    );
}

function TableRow(props) {
    const name = props.name ? props.name : "-";
    const location = latLngToText(props);
    return (
        <tr>
            <td>
                {name}
                <br/>
                <small className="text-muted">{location}</small>
            </td>
            <td>
                <FaPlus />
            </td>
        </tr>
    );
}
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Map from './Map/Map';
import Itinerary from './Itinerary/Itinerary';
import { usePlaces } from '../../hooks/usePlaces';

export default function Planner() {
    const {places, selectedIndex, placeActions} = usePlaces();

    return (
        <Container>
            <Section>
                <Map places={places} selectedIndex={selectedIndex} placeActions={placeActions} />
            </Section>
            <Section>
                <Itinerary places={places} selectedIndex={selectedIndex} placeActions={placeActions} />
            </Section>
        </Container>
    );
}

function Section(props) {
    return (
        <Row>
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                {props.children}
            </Col>
        </Row>
    );
}
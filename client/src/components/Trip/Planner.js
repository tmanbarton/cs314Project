import React from "react";
import { Col, Container, Row } from "reactstrap";
import Map from "./Map/Map";
import Itinerary from "./Itinerary/Itinerary";
import { usePlaces } from "../../hooks/usePlaces";

export default function Planner(props) {
	const { places, selectedIndex, placeActions, distances } = usePlaces(props.serverSettings, props.showMessage);

	return (
		<Container>
			<Section>
				<Map
					places={places}
					selectedIndex={selectedIndex}
					placeActions={placeActions}
				/>
			</Section>
			<hr />
			<Section>
				<Itinerary
					serverSettings={props.serverSettings}
					showMessage={props.showMessage}
					disableSearch={props.disableSearch}
					places={places}
					selectedIndex={selectedIndex}
					placeActions={placeActions}
					distances={distances}
				/>
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

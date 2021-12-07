import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import Map from "./Map/Map";
import Itinerary from "./Itinerary/Itinerary";
import { DEFAULT_STARTING_PLACE } from '../../utils/constants';
import { usePlaces } from "../../hooks/usePlaces";
import { placeToLatLng } from "../../utils/transformers";

export default function Planner(props) {
	const { places, selectedIndex, placeActions, distances, setSelectedIndex } = usePlaces(props.serverSettings, props.showMessage);
	const [center, setCenter] = useState(DEFAULT_STARTING_PLACE);
	const mapRef = useRef();

	useEffect(()=>{
		if(selectedIndex !== -1){
			setCenter(places[selectedIndex]);
		}
	},[selectedIndex])


	return (
		<Container>
			{props.showMap && (
				<React.Fragment>
					<Section>
						<Map places={places} selectedIndex={selectedIndex} placeActions={placeActions} center={center} mapRef={mapRef} setCenter={setCenter} showMap={props.showMap}/>
					</Section>
					<hr style={{marginTop: '.5rem'}}/>
				</React.Fragment>
			)}
			<Section>
				<Itinerary mapRef={mapRef} serverSettings={props.serverSettings} showMessage={props.showMessage} disableSearch={props.disableSearch} disableTour={props.disableTour} places={places} selectedIndex={selectedIndex} placeActions={placeActions} distances={distances} setSelectedIndex={setSelectedIndex} />
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

function centeredOnPlace(places, center){
	if(places.some((place)=> placeToLatLng(place).lat === placeToLatLng(center).lat && placeToLatLng(place).lng === placeToLatLng(center).lng)){
		return true;
	}
	return false;
}
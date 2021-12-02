import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import Map from "./Map/Map";
import Itinerary from "./Itinerary/Itinerary";
import { CENTER_OF_EARTH, DEFAULT_STARTING_PLACE } from '../../utils/constants';
import { usePlaces } from "../../hooks/usePlaces";
import { placeToLatLng } from "../../utils/transformers";

export default function Planner(props) {
	const { places, selectedIndex, placeActions, distances, setSelectedIndex } = usePlaces(props.serverSettings, props.showMessage);
	const [center, setCenter] = useState(DEFAULT_STARTING_PLACE);
	const mapRef = useRef();
	useEffect(()=>{
		if(center !== CENTER_OF_EARTH || centeredOnPlace(places, center)){
			setCenter(places[selectedIndex]);
		}else{
			let bounds = [];
			if(places.length){
				places.forEach(place => {
					bounds.push(placeToLatLng(place));
				});
				if(bounds.length){
					mapRef.current.leafletElement.fitBounds(bounds);
				}
				setCenter(mapRef.current.leafletElement.getCenter());
			}
		}
    },[selectedIndex, center]);


	return (
		<Container>
			<Section>
				<Map places={places} selectedIndex={selectedIndex} placeActions={placeActions} center={center} mapRef={mapRef} setCenter={setCenter}/>
			</Section>
			<hr />
			<Section>
				<Itinerary
					serverSettings={props.serverSettings}
					showMessage={props.showMessage}
					disableSearch={props.disableSearch}
					disableTour={props.disableTour}
					places={places}
					selectedIndex={selectedIndex}
					placeActions={placeActions}
					distances={distances}
					setSelectedIndex={setSelectedIndex}
					setCenter={setCenter}
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

function centeredOnPlace(places, center){
	if(places.some((place)=> placeToLatLng(place).lat === placeToLatLng(center).lat && placeToLatLng(place).lng === placeToLatLng(center).lng)){
		return true;
	}
	return false;
}
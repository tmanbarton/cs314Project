import React from "react";
import {
	Row,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Container,
} from "reactstrap";
import { FaToolbox } from "react-icons/fa";

export default function FileModal(props) {
	return (
		<Modal isOpen={props.isOpen} toggle={props.toggleToolbox}>
			<Header toggle={props.toggleToolbox}/>
			<Body  toggle={props.toggleToolbox}/>
			<Footer toggleOpen={props.toggleToolbox} />
		</Modal>
	);
}

function Header(props) {
	return (
		<ModalHeader toggle={props.toggle}>
			Trip Toolbox &nbsp;
			<FaToolbox size={20}/>
		</ModalHeader>
	);
}

function Body() {
	return (
		<ModalBody>
			<Row>
				<LoadTrip />
			</Row>
			<Row>
				<SaveTrip />
			</Row>
		</ModalBody>
	);
}

function LoadTrip(){
	return (
		<Container>
			<h5>Load Trip</h5>
			<hr />
		</Container>
	);
}

function SaveTrip(){
	return (
		<Container>
			<h5>Save Trip</h5>
			<hr />
		</Container>
	);
}

function Footer(props) {
	return (
		<ModalFooter>
			
		</ModalFooter>
	);
}

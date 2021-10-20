import React, { useRef, useState, useEffect } from "react";
import {
	Row,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Container,
	Button,
	Col,
} from "reactstrap";
import { FaToolbox, FaUpload, FaCheck, FaDownload } from "react-icons/fa";
import Papa from 'papaparse';


export default function TripToolbox(props) {
	const [fileName, setFileName] = useState("");
	return (
		<Modal isOpen={props.isOpen} toggle={props.toggleToolbox}>
			<Header toggle={props.toggleToolbox} />
			<Body
				fileName={fileName}
				setFileName={setFileName}
				toggle={props.toggleToolbox}
				toolboxMethods={props.toolboxMethods}
				tripName={props.tripName}
			/>
			<Footer toggleOpen={props.toggleToolbox} />
		</Modal>
	);
}

function Header(props) {
	return (
		<ModalHeader tag="h3" cssModule={{'modal-title': 'w-100 text-center'}}>
			<strong>Trip Toolbox</strong> &nbsp; 
			<FaToolbox className="fa-inline" size={26}/>
		</ModalHeader>
	);
}

function Body(props) {
	return (
		<ModalBody className="center-modal-body">
			<Row>
				<LoadTrip toolboxMethods={props.toolboxMethods} setFileName={props.setFileName} fileName={props.fileName} />
			</Row>
			<Row>
				<SaveTrip tripName={props.tripName}/>
			</Row>
		</ModalBody>
	);
}

async function csvToTrip(file, append){
	const papaAwait = file => new Promise(resolve => Papa.parse(file, {header: true, complete: results => resolve(results.data)}));
	let places = await papaAwait(file);
	places.pop();

	for(let i = 0; i < places.length; i++){
		await append(places[i]);
	}

}

function getFileType(fileName){
	let parts = fileName.split('.');
	return parts[parts.length - 1].toLowerCase();
}

async function processFile(file, fileName, toolboxMethods){
	let fileType = getFileType(fileName);
	toolboxMethods.removeAll();
	switch (fileType){
		case "csv":
			csvToTrip(file, toolboxMethods.append);
			toolboxMethods.showMessage(`Successfully imported ${fileName} to your Trip.`, "success");
		case "json":

			toolboxMethods.showMessage(`Successfully imported ${fileName} to your Trip.`, "success");
	}
}

function LoadTrip(props) {
	const fileInputRef = useRef();

	function fileUploaded(fileObject) {
		let file = fileObject.target.files[0];
		props.setFileName(fileObject.target.files[0].name);
		processFile(file, fileObject.target.files[0].name, props.toolboxMethods, props.showMessage);
	}

	return (
		<Container>
			<Container>
				<h4>Load Trip</h4>
				<hr />
			</Container>

			<Container>
				<Button data-testid="upload-btn" color="primary" onClick={() => fileInputRef.current.click()}>
					<FaUpload />
				</Button>
				<input
					type="file"
					accept=".json, .csv, application/json, text/csv"
					ref={fileInputRef}
					onChange={fileUploaded}
					type="file"
					hidden
				/>

				{props.fileName.length > 0 ? (
					<Container>
						<br />
						<p>
							Uploaded <strong>{props.fileName}</strong> <FaCheck />
						</p>
					</Container>
				) : null}
			</Container>
			<hr />
		</Container>
	);
}

function SaveTrip(props) {
	return (
		<Container>
			<h4>Save {props.tripName}</h4>
			<hr />
			<Row>
				<Col>
					<Button color="primary">
						<h6> CSV &nbsp; <FaDownload/> </h6>
					</Button>
				</Col>

				<Col>
					<Button color="primary">
						<h6> JSON &nbsp; <FaDownload/> </h6>
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

function Footer(props) {
	return <ModalFooter></ModalFooter>;
}

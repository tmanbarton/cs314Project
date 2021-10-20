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
	Spinner
} from "reactstrap";
import { FaToolbox, FaUpload, FaCheck, FaDownload } from "react-icons/fa";
import { latLngToPlace  } from "../../../utils/transformers";
import Papa from 'papaparse';

let loading = false;

export default function TripToolbox(props) {
	const [fileName, setFileName] = useState("");
	return (
		<Modal isOpen={props.isOpen} toggle={!loading ? props.toggleToolbox : null}>
			<Header toggle={props.toggleToolbox} />
			<Body
				places={props.places}
				fileName={fileName}
				setFileName={setFileName}
				toggle={props.toggleToolbox}
				toolboxMethods={props.toolboxMethods}
				tripName={props.tripName}
			/>
			<Footer fileName={fileName} toggleToolbox={props.toggleToolbox} />
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
				<SaveTrip tripName={props.tripName} fileName={props.fileName} places={props.places} showMessage={props.toolboxMethods.showMessage}/>
			</Row>
		</ModalBody>
	);
}

async function csvToTrip(file, append){
	const papaAwait = file => new Promise(resolve => Papa.parse(file, {header: true, complete: results => resolve(results.data)}));
	let places = await papaAwait(file);

	for(let i = 0; i < places.length; i++){
		await append(places[i]);
	}

}

async function jsonToTrip(file, append){
	const fileContents = await readFile(file)
	let jsonFile = JSON.parse(fileContents)
	let places = jsonFile["places"]
	
	for (let i= 0; i < places.length; i++){
		await append(places[i])
	}
}

function readFile(file) {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
  
	  reader.onload = res => {
		resolve(res.target.result);
	  };
	  reader.onerror = err => reject(err);
  
	  reader.readAsText(file);
	});
  }

function getFileType(fileName){
	let parts = fileName.split('.');
	return parts[parts.length - 1].toLowerCase();
}

function trimFileName(fileName){
	let parts = fileName.split('.');
	parts.pop();
	return parts.join('.');
}

async function processFile(file, fileName, toolboxMethods){
	toolboxMethods.setTripName(trimFileName(fileName));
	let fileType = getFileType(fileName);
	toolboxMethods.removeAll();
	switch (fileType){
		case "csv":
			await csvToTrip(file, toolboxMethods.append);
			loading = false;
			toolboxMethods.showMessage(`Successfully imported ${fileName} to your Trip.`, "success");
		case "json":
			await jsonToTrip(file, toolboxMethods.append);
			loading = false;
			toolboxMethods.showMessage(`Successfully imported ${fileName} to your Trip.`, "success");
	}
}

function LoadTrip(props) {
	const fileInputRef = useRef();

	function fileUploaded(fileObject) {
		loading = true;
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
					{loading ? (
						<Spinner size="sm"/>
					):
						<FaUpload />
					}
				</Button>
				<input
					type="file"
					accept=".json, .csv, application/json, text/csv"
					ref={fileInputRef}
					onChange={fileUploaded}
					type="file"
					hidden
				/>

				{props.fileName.length > 0 && !loading ? (
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
					<Button color="primary" onClick={() =>storeCSV(props.places, props.tripName, props.showMessage)}>
						<h6> CSV &nbsp; <FaDownload/> </h6>
					</Button>
				</Col>
				
				<Col>
					<Button disabled={loading} color="primary" onClick={() =>storeJSON(props.places, props.tripName, props.showMessage)}>
						<h6> JSON &nbsp; <FaDownload/> </h6>
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

function Footer(props) {
	return (
	<ModalFooter className="centered">
		<Button color="primary" disabled={loading} onClick={()=>props.toggleToolbox()}>
			{loading ? `Please Wait for ${props.fileName} to Upload` : 'Continue'}
		</Button>
	</ModalFooter>
	);
}

function storeCSV(places, tripName, showMessage) {
	localStorage.clear();
	localStorage.setItem("fileExtension", "CSV");
	
	let formattedPlaces = [];
	
	for(let i = 0; i < places.length; i++){
		formattedPlaces.push({...latLngToPlace(places[i]), name: places[i].name});
	}
	
	const placesCSV = Papa.unparse(formattedPlaces);
	const fileNameWithExtension = tripName + ".csv";
	const trip = new Blob([placesCSV], { type: "text/csv" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(trip);
	link.href = url;
	link.download = fileNameWithExtension;
	document.body.appendChild(link);
	link.click();
	setTimeout(function() {
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}, 0);
	showMessage(`Successfully downloaded ${tripName} to JSON.`, "success");
}

function storeJSON(places, tripName, showMessage) 
{
	localStorage.clear();
		localStorage.setItem("fileExtension", "JSON");

	let formattedPlaces = [];

	for(let i = 0; i < places.length; i++){
		formattedPlaces.push({...latLngToPlace(places[i]), name: places[i].name});
	}
	
	const fileNameWithExtension = tripName + ".JSON";
	const placesJSON = JSON.stringify({
		places: formattedPlaces
	});
	const trip = new Blob([placesJSON], { type: JSON });
	const link = document.createElement("a");
	const url = URL.createObjectURL(trip);
	link.href = url;
	link.download = fileNameWithExtension;
	document.body.appendChild(link);
	link.click();
	setTimeout(function() {
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	  }, 0);
	
	showMessage(`Successfully downloaded ${tripName} to JSON.`, "success");
}


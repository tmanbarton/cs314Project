import React, { useRef, useState } from "react";
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
import * as TripSchema from '../../../../schemas/TripFile.json';
import { latLngToPlace  } from "../../../utils/transformers";
import Papa from 'papaparse';
import { isJsonResponseValid } from "../../../utils/restfulAPI";

export default function TripToolbox(props) {
	const [fileName, setFileName] = useState("");
	const [loading, setLoading] = useState(false);
	return (
		<Modal isOpen={props.isOpen} toggle={!loading ? props.toggleToolbox : null}>
			<Header />
			<Body
				places={props.places}
				fileName={fileName}
				setFileName={setFileName}
				toggle={props.toggleToolbox}
				toolboxMethods={props.toolboxMethods}
				tripName={props.tripName}
				loading={loading}
				setLoading={setLoading}
			/>
			<Footer loading={loading} fileName={fileName} toggleToolbox={props.toggleToolbox} />
		</Modal>
	);
}

function Header() {
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
				<LoadTrip loading={props.loading} setLoading={props.setLoading} toolboxMethods={props.toolboxMethods} setFileName={props.setFileName} fileName={props.fileName} />
			</Row>
			<Row>
				<SaveTrip loading={props.loading} tripName={props.tripName} fileName={props.fileName} places={props.places} showMessage={props.toolboxMethods.showMessage}/>
			</Row>
		</ModalBody>
	);
}

function LoadTrip(props) {
	const fileInputRef = useRef();

	function fileUploaded(fileObject) {
		props.setLoading(true);
		let file = fileObject.target.files[0];
		props.setFileName(fileObject.target.files[0].name);
		processFile(file, fileObject.target.files[0].name, {...props.toolboxMethods, setFileName: props.setFileName}, props.setLoading);
	}

	return (
		<Container>
			<Container>
				<h4>Load Trip</h4>
				<hr />
			</Container>
			<Container>
				<Button data-testid="upload-btn" color="primary" onClick={() => fileInputRef.current.click()}>
					{props.loading ? (
						<Spinner size="sm"/>
					):
						<FaUpload />
					}
				</Button>
				<input
					data-testid="input"
					type="file"
					accept=".json, .csv, application/json, text/csv"
					ref={fileInputRef}
					onChange={fileUploaded}
					type="file"
					hidden
				/>
				{props.fileName.length > 0 && !props.loading ? (
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
					<Button data-testid="CSV-download-button" disabled={props.loading} color="primary" onClick={() =>storeCSV(props.places, props.tripName, props.showMessage)}>
						<h6> CSV &nbsp; <FaDownload/> </h6>
					</Button>
				</Col>
				<Col>
					<Button data-testid="JSON-download-button" disabled={props.loading} color="primary" onClick={() =>storeJSON(props.places, props.tripName, props.showMessage)}>
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
		<Button data-testid="continue-button" color="primary" disabled={props.loading} onClick={()=>props.toggleToolbox()}>
			{props.loading ? `Please Wait for ${props.fileName} to Upload` : 'Continue'}
		</Button>
	</ModalFooter>
	);
}

async function processFile(file, fileName, toolboxMethods, setLoading){
	toolboxMethods.setTripName(trimFileName(fileName));
	let fileType = getFileType(fileName);
	toolboxMethods.removeAll();
	switch (fileType){
		case "csv":
			await csvToTrip(file, {append: toolboxMethods.append, showMessage: toolboxMethods.showMessage, setFileName: toolboxMethods.setFileName}, fileName);
			setLoading(false);
			break;
		case "json":
			await jsonToTrip(file, {append: toolboxMethods.append, showMessage: toolboxMethods.showMessage, setFileName: toolboxMethods.setFileName}, fileName);
			setLoading(false);
			break
		default:
			break;
	}
}

function trimFileName(fileName){
	let parts = fileName.split('.');
	parts.pop();
	return parts.join('.');
}

function getFileType(fileName){
	let parts = fileName.split('.');
	return parts[parts.length - 1].toLowerCase();
}

async function csvToTrip(file, toolboxMethods, fileName){
	const papaAwait = file => new Promise(resolve => Papa.parse(file, {header: true, complete: results => resolve(results.data)}));
	let places = await papaAwait(file);
	if(isValidFile({places:places})){
		for(let i = 0; i < places.length; i++){
			await toolboxMethods.append(places[i]);
		}
		toolboxMethods.showMessage(`Successfully imported ${fileName} to your Trip.`, "success");
	}else{
		toolboxMethods.showMessage(`Failed to upload ${fileName}.`, "error");
		toolboxMethods.setFileName("");
		return;
	}

}

async function jsonToTrip(file, toolboxMethods, fileName){
	const fileContents = await readFile(file);
	let jsonFile = JSON.parse(fileContents);
	if(isValidFile(jsonFile)){
		let places = jsonFile["places"];
		for (let i= 0; i < places.length; i++){
			await toolboxMethods.append(places[i]);
		}
		console.log("HERE");
		toolboxMethods.showMessage(`Successfully imported ${fileName} to your Trip.`, "success");
		return;
	}else{
		toolboxMethods.showMessage(`Failed to upload ${fileName}.`, "error");
		toolboxMethods.setFileName("");
		return;
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

function isValidFile(places){
	return isJsonResponseValid(places, TripSchema);
}

function storeCSV(places, tripName, showMessage) {
	localStorage.clear();
	localStorage.setItem("fileExtension", "CSV");
	
	const formattedPlaces = formatPlaces(places);
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
	showMessage(`Successfully downloaded ${tripName} to CSV.`, "success");
}

function storeJSON(places, tripName, showMessage) 
{
	localStorage.clear();
	localStorage.setItem("fileExtension", "JSON");

	const formattedPlaces = formatPlaces(places);
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

function formatPlaces(places){
	let formattedPlaces = [];
	
	for(let i = 0; i < places.length; i++){
		formattedPlaces.push({...latLngToPlace(places[i]), name: places[i].name});
	}
	return formattedPlaces;
}





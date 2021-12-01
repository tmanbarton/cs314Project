import React, { useEffect, useRef, useState } from "react";
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
import { FaSave, FaUpload, FaCheck, FaDownload } from "react-icons/fa";
import * as TripSchema from '../../../../schemas/TripFile.json';
import { formatPlaces  } from "../../../utils/transformers";
import Papa from 'papaparse';
import { isJsonResponseValid } from "../../../utils/restfulAPI";
import { EditableInput } from "./Itinerary";

export default function TripManager(props) {
	const [fileName, setFileName] = useState("");
	const [loading, setLoading] = useState(false);
	useEffect(()=>{
		setFileName("");
		setLoading(false);
	},[props.isOpen]);
	return (
		<Modal isOpen={props.isOpen} toggle={!loading ? props.toggleManager : null}>
			<Header />
			<Body
				text={props.text} 
				setText={props.setText}
				places={props.places}
				fileName={fileName}
				setFileName={setFileName}
				toggle={props.toggleManager}
				managerMethods={props.managerMethods}
				tripName={props.tripName}
				loading={loading}
				setLoading={setLoading}
			/>
			<Footer loading={loading} fileName={fileName} toggleManager={props.toggleManager} />
		</Modal>
	);
}

function Header() {
	return (
		<ModalHeader tag="h3" cssModule={{'modal-title': 'w-100 text-center'}}>
			<strong>Trip Manager</strong> &nbsp; 
			<FaSave size={26}/>
		</ModalHeader>
	);
}

function Body(props) {
	return (
		<ModalBody className="center-modal-body">
			<Row>
				<LoadTrip loading={props.loading} setLoading={props.setLoading} managerMethods={props.managerMethods} setFileName={props.setFileName} fileName={props.fileName} />
			</Row>
			<Row>
				<SaveTrip text={props.text} setText={props.setText} loading={props.loading} tripName={props.tripName} fileName={props.fileName} places={props.places} showMessage={props.managerMethods.showMessage}/>
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
		processFile(file, fileObject.target.files[0].name, {...props.managerMethods, setFileName: props.setFileName}, props.setLoading);
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
			<h4>Save <EditableInput className="tripText" text={props.text} setText={props.setText}/></h4>
			<hr />
			<Row className="save-trip-row">
				<Col>
					<Button data-testid="CSV-download-button" disabled={props.loading} color="primary" onClick={() =>storeCSV(props.places, props.tripName, props.showMessage)}>
						<FaDownload/><p className="button-label">CSV</p>
					</Button>
				</Col>
				<Col>
					<Button data-testid="JSON-download-button" disabled={props.loading} color="primary" onClick={() =>storeJSON(props.places, props.tripName, props.showMessage)}>
						<FaDownload/><p className="button-label">JSON</p>
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

function Footer(props) {
	return (
	<ModalFooter className="centered">
		<Button data-testid="continue-button" color="primary" disabled={props.loading} onClick={()=>props.toggleManager()}>
			{props.loading ? `Please Wait for ${props.fileName} to Upload` : 'Continue'}
		</Button>
	</ModalFooter>
	);
}

async function processFile(file, fileName, managerMethods, setLoading){
	managerMethods.setTripName(trimFileName(fileName));
	let fileType = getFileType(fileName);
	managerMethods.removeAll();
	switch (fileType){
		case "csv":
			await csvToTrip(file, {bulkAppend: managerMethods.bulkAppend, showMessage: managerMethods.showMessage, setFileName: managerMethods.setFileName}, fileName);
			setLoading(false);
			break;
		case "json":
			await jsonToTrip(file, {bulkAppend: managerMethods.bulkAppend, showMessage: managerMethods.showMessage, setFileName: managerMethods.setFileName}, fileName);
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

async function csvToTrip(file, managerMethods, fileName){
	const papaAwait = file => new Promise(resolve => Papa.parse(file, {header: true, complete: results => resolve(results.data)}));
	const places = await papaAwait(file);
	if(isValidFile({places:places})){
		managerMethods.bulkAppend(places);
		managerMethods.showMessage(`Successfully imported ${fileName} to your Trip.`, "success");
	}else{
		managerMethods.showMessage(`Failed to upload ${fileName}.`, "error");
		managerMethods.setFileName("");
		return;
	}

}

async function jsonToTrip(file, managerMethods, fileName){
	const fileContents = await readFile(file);
	let jsonFile = JSON.parse(fileContents);
	if(isValidFile(jsonFile)){
		const places = jsonFile["places"];
		managerMethods.bulkAppend(places);
		managerMethods.showMessage(`Successfully imported ${fileName} to your Trip.`, "success");
		return;
	}else{
		managerMethods.showMessage(`Failed to upload ${fileName}.`, "error");
		managerMethods.setFileName("");
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
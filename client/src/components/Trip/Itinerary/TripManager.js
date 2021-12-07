import React, { useEffect, useRef, useState } from "react";
import { Row, DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from "reactstrap";
import { FaSave, FaUpload, FaCheck, FaDownload } from "react-icons/fa";
import * as TripSchema from '../../../../schemas/TripFile.json';
import { formatPlaces  } from "../../../utils/transformers";
import Papa from 'papaparse';
import { isJsonResponseValid } from "../../../utils/restfulAPI";
import { getMapBounds } from "../Map/Map";
import { useToggle } from "../../../hooks/useToggle";

export default function TripManager(props) {
	const [dropdownOpen, setDropdownOpen] = useToggle(false);
	const [fileName, setFileName] = useState("");
	useEffect(()=>{
		setFileName("");
	},[]);

	return (
		<Dropdown 
		isOpen={dropdownOpen}
		toggle={setDropdownOpen}
		direction="up"
		size="sm"
		className="button-group"
		data-testid="file-dropdown">
		<DropdownToggle color='primary' className="modify-dropdown" style={{borderTopRightRadius: '0px', borderBottomRightRadius: '0px'}}>
			<FaSave size={18} />
			<p className="button-label">&nbsp;&nbsp;File&nbsp;&nbsp;</p>
		</DropdownToggle>
		<DropdownItems places={props.places} tripName={props.tripName} managerMethods={props.managerMethods} setFileName={setFileName} fileName={fileName}/>
	</Dropdown>
	);
}

function DropdownItems(props){
	const fileInputRef = useRef();

	function fileUploaded(fileObject) {
		let file = fileObject.target.files[0];
		props.setFileName(fileObject.target.files[0].name);
		processFile(file, fileObject.target.files[0].name, {...props.managerMethods, setFileName: props.setFileName});
	}

	return (
		<React.Fragment>
			<DropdownMenu right>
				<DropdownItem onClick={()=> fileInputRef.current.click()}>
					<Row><h4><FaUpload data-testid="upload-btn" className="fa-inline"  size = {20}/>&nbsp;&nbsp;Load New Trip</h4></Row>
				</DropdownItem>
				<DropdownItem onClick={()=> storeCSV(props.places, props.tripName, props.managerMethods.showMessage)}>
					<Row><h4><FaDownload data-testid="CSV-download-button" className="fa-inline"  size = {20} />&nbsp;&nbsp;Save as CSV</h4></Row>
				</DropdownItem>
				<DropdownItem onClick={() => storeJSON(props.places, props.tripName, props.managerMethods.showMessage)}>
					<Row><h4><FaDownload data-testid="JSON-download-button" className="fa-inline" size = {20}/>&nbsp;&nbsp;Save as JSON</h4></Row>
				</DropdownItem>
			</DropdownMenu>
			<input data-testid="input" type="file" accept=".json, .csv, application/json, text/csv" ref={fileInputRef} onChange={fileUploaded} type="file" hidden/>
		</React.Fragment>

	);
}

async function processFile(file, fileName, managerMethods){
	managerMethods.setTripName(trimFileName(fileName));
	let fileType = getFileType(fileName);
	managerMethods.removeAll();
	switch (fileType){
		case "csv":
			await csvToTrip(file, {bulkAppend: managerMethods.bulkAppend, showMessage: managerMethods.showMessage, setFileName: managerMethods.setFileName, mapRef: managerMethods.mapRef}, fileName);
			break;
		case "json":
			await jsonToTrip(file, {bulkAppend: managerMethods.bulkAppend, showMessage: managerMethods.showMessage, setFileName: managerMethods.setFileName, mapRef: managerMethods.mapRef}, fileName);
			break;
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
		managerMethods.mapRef.current.leafletElement.fitBounds(getMapBounds(places));
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
		managerMethods.mapRef.current.leafletElement.fitBounds(getMapBounds(places));
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
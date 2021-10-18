import React, { useRef, useState } from "react";
import {
	Row,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Container,
	Button,
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
				<SaveTrip />
			</Row>
		</ModalBody>
	);
}

async function csvToTrip(file, bulkAppend){
	const papaAwait = file => new Promise(resolve => Papa.parse(file, {header: true, complete: results => resolve(results.data)}));
	let places = await papaAwait(file);
	console.log(places);
	places.pop();
	console.log(places);
	bulkAppend(places);
}

function getFileType(fileName){
	let parts = fileName.split('.');
	return parts[parts.length - 1].toLowerCase();
}

async function processFile(file, fileName, toolboxMethods){
	let fileType = getFileType(fileName);
	await toolboxMethods.removeAll();
	switch (fileType){
		case "csv":
			csvToTrip(file, toolboxMethods.bulkAppend);
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

function SaveTrip() {
	return (
		<Container>
			<h4>Save Trip</h4>
			<hr />
			<div className="save-trip-button">
				<Button color="primary">
					<strong> CSV </strong>
					<FaDownload/>
				</Button>

				<h6>OR</h6>

				<Button color="primary">
					<strong> JSON </strong>
					<FaDownload/>
				</Button>
			</div>
		</Container>
	);
}

function Footer(props) {
	return <ModalFooter></ModalFooter>;
}

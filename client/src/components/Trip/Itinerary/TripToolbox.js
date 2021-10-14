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
import { FaToolbox, FaUpload, FaCheck } from "react-icons/fa";


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

function getFileType(fileName){
	let parts = fileName.split('.');
	return parts[parts.length - 1].toLowerCase();
}

function processFile(file, fileName, toolboxMethods, showMessage){
	let fileType = getFileType(fileName);
	toolboxMethods.removeAll();
	switch (fileType){
		case "csv":
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
				<h5>Load Trip</h5>
				<hr />
			</Container>

			<Container>
				<Button color="primary" onClick={() => fileInputRef.current.click()}>
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
			<h5>Save Trip</h5>
			<hr />
		</Container>
	);
}

function Footer(props) {
	return <ModalFooter></ModalFooter>;
}

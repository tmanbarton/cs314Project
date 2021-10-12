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

export default function FileModal(props) {
	const [fileName, setFileName] = useState("");
	return (
		<Modal isOpen={props.isOpen} toggle={props.toggleToolbox}>
			<Header toggle={props.toggleToolbox} />
			<Body
				fileName={fileName}
				setFileName={setFileName}
				toggle={props.toggleToolbox}
			/>
			<Footer toggleOpen={props.toggleToolbox} />
		</Modal>
	);
}

function Header(props) {
	return (
		<ModalHeader toggle={props.toggle}>
			Trip Toolbox &nbsp;
			<FaToolbox size={20} />
		</ModalHeader>
	);
}

function Body(props) {
	return (
		<ModalBody>
			<Row>
				<LoadTrip setFileName={props.setFileName} fileName={props.fileName} />
			</Row>
			<Row>
				<SaveTrip />
			</Row>
		</ModalBody>
	);
}

function LoadTrip(props) {
	const fileInputRef = useRef();

	function fileUploaded(file) {
		props.setFileName(file.target.files[0].name);
	}

	return (
		<Container className="centered">
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

import React from "react";
import {
	Row,
	Col,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
} from "reactstrap";
import { FaCheckSquare, FaWindowClose, FaCheck } from "react-icons/fa";

const supportedFeatures = ["config", "find"];

export default function ServerSettings(props) {
	return (
		<Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
			<Header />
			<Body features={props.features} />
			<Footer toggleOpen={props.toggleOpen} />
		</Modal>
	);
}

function evaluateSupport(newFeatures, supportedFeature) {
	return newFeatures.indexOf(supportedFeature) > -1;
}

function Header() {
	return (
		<ModalHeader className="centered">
			Features Checklist &nbsp;
			<FaCheck size={20}/>
		</ModalHeader>
	);
}

function Body(props) {
	return (
		<ModalBody>
			{supportedFeatures.map((feature, index) => (
				<Row className="centered" key={`${index} - ${feature}`}>
					<Col>
						<h2
							style={
								evaluateSupport(props.features, feature)
									? { color: "#00FF00" }
									: { color: "#FF0000" }
							}
						>
							{feature}
						</h2>
					</Col>
					<Col>
						{evaluateSupport(props.features, feature) ? (
							<FaCheckSquare style={{ color: "#00FF00" }} size={32} />
						) : (
							<FaWindowClose style={{ color: "#FF0000" }} size={32} />
						)}
					</Col>
					<hr />
				</Row>
			))}
		</ModalBody>
	);
}

function Footer(props) {
	return (
		<ModalFooter className="centered">
			<Button color="primary" onClick={props.toggleOpen}>
				Continue
			</Button>
		</ModalFooter>
	);
}

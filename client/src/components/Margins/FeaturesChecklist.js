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

export default function FeaturesChecklist(props) {
	return (
		<Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
			<Header />
			<Body supportedFeatures={props.supportedFeatures} features={props.features} />
			<Footer toggleOpen={props.toggleOpen} />
		</Modal>
	);
}

function evaluateSupport(newFeatures, supportedFeature) {
	return newFeatures.indexOf(supportedFeature) > -1;
}

function Header() {
	return (
		<ModalHeader tag="h3" cssModule={{'modal-title': 'w-100 text-center'}}>
			<strong>Features Checklist</strong> &nbsp;
			<FaCheck className="fa-inline" size={26}/>
		</ModalHeader>
	);
}

function Body(props) {
	return (
		<ModalBody className="center-modal-body">
			{props.supportedFeatures.map((feature, index) => (
				<Row className="centered" key={`${index} - ${feature}`}>
					<Col>
						<h2
							style={
								evaluateSupport(props.features, feature)
									? { color: "#2e8540" }
									: { color: "#cd2026" }
							}
						>
							{feature}
						</h2>
					</Col>
					<Col>
						{evaluateSupport(props.features, feature) ? (
							<FaCheckSquare style={{ color: "#2e8540" }} size={32} />
						) : (
							<FaWindowClose style={{ color: "#cd2026" }} size={32} />
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

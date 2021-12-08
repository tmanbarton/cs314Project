import React from "react";
import { useToggle } from "../../hooks/useToggle";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Card, CardBody, CardHeader, CardText, Collapse, CardDeck } from "reactstrap";
import { FaCheckSquare, FaWindowClose, FaCheck } from "react-icons/fa";
import { SUPPORTED_FEATURES } from "../../utils/constants";

const supported = '#2e8540';
const notSupported = '#cd2026';

export default function FeaturesChecklist(props) {
	return (
		<Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
			<Header />
			<Body supportedFeatures={SUPPORTED_FEATURES} features={props.features} />
			<Footer toggleOpen={props.toggleOpen} />
		</Modal>
	);
}

function evaluateSupport(newFeatures, supportedFeature) {
	if(!newFeatures[0].name){
		return newFeatures.indexOf(supportedFeature) > -1;
	}
	return newFeatures.filter((feature, index) => feature.name === supportedFeature);
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
		<ModalBody>
			{props.supportedFeatures.map((feature, index) => (
				<div>
					<Row className="centered" key={`${index} - ${feature.name}`}>
						<Col>
							<h4
								style={
									evaluateSupport(props.features, feature.name)
										? { color: "#2e8540" }
										: { color: "#cd2026" }
								}
							>
								{feature.name.charAt(0).toUpperCase() + feature.name.slice(1)}
							</h4>
						</Col>
						<Col>
							{evaluateSupport(props.features, feature.name) ? (
								<FaCheckSquare style={{ color: "#2e8540" }} size={32} />
							) : (
								<FaWindowClose style={{ color: "#cd2026" }} size={32} />
							)}
						</Col>
						<hr />
					</Row>
					<Row>
						<p>{feature.description}</p>
					</Row>
				</div>
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

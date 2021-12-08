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
		if(supportedFeature === 'find' || supportedFeature === 'distances' || supportedFeature === 'tour'){
			return newFeatures.indexOf(supportedFeature) > -1;
		}
		return true;
	}
	return newFeatures.filter((feature) => feature.name === supportedFeature);
}

function Header() {
	return (
		<ModalHeader tag="h3" cssModule={{ "modal-title": "w-100 text-center" }}>
			<strong>Features Checklist</strong> &nbsp;
			<FaCheck className="fa-inline" size={26} />
		</ModalHeader>
	);
}

function Body(props) {
	return (
		<ModalBody style={{overflow: 'auto', height: '15rem'}}>
			<CardDeck>
				{props.supportedFeatures.map((feature) => (
					<FeatureCard
						features={props.features}
						featureName={feature.name}
						featureDescription={feature.description}
						key={`featureCard - ${feature.name}`}
					/>
				))}
			</CardDeck>
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

function FeatureCard(props) {
	const [cardOpen, toggleCardOpen] = useToggle(false);
	return (
		<Card onClick={() => toggleCardOpen()} style={{minWidth: '50%'}}>
			<CardHeader className="text-center">
				{props.featureName.charAt(0).toUpperCase() + props.featureName.slice(1)}
				&nbsp;&nbsp;
				{evaluateSupport(props.features, props.featureName) ? (
					<FaCheckSquare color={supported} />
				) : (
					<FaWindowClose color={notSupported} />
				)}
			</CardHeader>
			<Collapse isOpen={cardOpen}>
				<CardBody>
					<CardText>{props.featureDescription}</CardText>
				</CardBody>
			</Collapse>
		</Card>
	);
}

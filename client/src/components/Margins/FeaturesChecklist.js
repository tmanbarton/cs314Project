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
	const findDescription = "Select the search icon to search for a place by name. Use the globe icon to switch to searching by coordinates and the dice icon to generate random places.";
	const distancesDescription = "The total distance of your trip is shown at the top and bottom of your itinerary. The cumulative distance is shown when you expand the individual locations.";
	const tourDescription = "You can edit your trip by dragging and dropping with the drag handles, or with the options in the \"Modify\" menu: optimize your trip to get a shorter route, randomly order the trip, reverse the trip, or remove all of the locations.";

	return (
		<ModalBody className="center-modal-body">
			{props.supportedFeatures.map((feature, index) => (
				<div>
					{ feature != "config" &&
						<Row className="centered" key={`${index} - ${feature}`}>
							<Col>
								<h4
									style={
										evaluateSupport(props.features, feature)
											? { color: "#2e8540" }
											: { color: "#cd2026" }
									}
								>
									{feature}
								</h4>
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
					}
					{ feature == "find" &&
						<Row style={{ textAlign: "left" }}>
							{findDescription}
						</Row>
					}
					{ feature == "distances" &&
						<Row style={{ textAlign: "left" }}>
							{distancesDescription}
						</Row>
					}
					{ feature == "tour" &&
						<Row style={{ textAlign: "left" }}>
							{tourDescription}
						</Row>
					}
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

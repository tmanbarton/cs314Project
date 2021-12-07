import React, { useState } from "react";
import {
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from "reactstrap";
import { useToggle } from "../../hooks/useToggle";
import FeaturesChecklist from "./FeaturesChecklist";
import { avaliableServers } from "./avalibleServers";
import { sendAPIRequest } from "../../utils/restfulAPI";
import { FaInfoCircle } from "react-icons/fa";
import { SUPPORTED_FEATURES } from "../../utils/constants";

const UNICODE_LINK_SYMBOL = "\uD83D\uDD17";
const UNICODE_WARNING_SIGN = "\u26A0";
const UNKNOWN_SERVER_NAME = "Unknown";



export default function Footer(props) {
	const [featuresRecieved, setFeaturesRecieved] = useState(SUPPORTED_FEATURES);
	let stateMethods = {
		toggleFeaturesChecklist: props.toggleFeaturesChecklist,
		setFeaturesRecieved: setFeaturesRecieved,
		setDisableSearch: props.setDisableSearch,
		processServerConfigSuccess: props.processServerConfigSuccess,
		setDisableTour: props.setDisableTour
	};
	let stateVariables = {
		featuresChecklistOpen: props.featuresChecklistOpen,
		featuresRecieved: featuresRecieved,
		disableSearch: props.disableSearch,
		disableTour: props.disableTour
	};

	return (
		<div className="full-width footer">
			<ServerInformation
				showMessage={props.showMessage}
				stateMethods={stateMethods}
				stateVariables={stateVariables}
				{...props}
			/>
		</div>
	);
}

function toggleFeatures(avaliableFeatures, stateVariable, feature){
	if(avaliableFeatures.indexOf(feature) == -1 && !stateVariable || avaliableFeatures.indexOf(feature) > -1 && stateVariable){
		return true;
	}
	return false;
}

function evaluateFeatures(avaliableFeatures, stateMethods, stateVariables) {

	if (toggleFeatures(avaliableFeatures, stateVariables.disableSearch, "find")){
		stateMethods.setDisableSearch();
	}

	if(toggleFeatures(avaliableFeatures, stateVariables.disableTour, "tour")){
		stateMethods.setDisableTour();
	}
	
}

async function changeServers(
	server,
	stateMethods,
	stateVariables,
	showMessage
) {
	const baseUrl = "https://localhost:";
	const newUrl = baseUrl + server.extension;
	const response = await sendAPIRequest({ requestType: "config" }, newUrl);

	if (response) {
		stateMethods.processServerConfigSuccess(response, newUrl);
		stateMethods.setFeaturesRecieved(response.features);
		evaluateFeatures(
			response.features,
			{ setDisableSearch: stateMethods.setDisableSearch, setDisableTour: stateMethods.setDisableTour },
			{ disableSearch: stateVariables.disableSearch, disableTour: stateVariables.disableTour }
		);
		stateMethods.toggleFeaturesChecklist();
	} else {
		showMessage(
			`Switching to server: '${server.teamName}', using url: ${newUrl} failed. Check the log for more details.`,
			"error"
		);
	}
}

function ServerInformation(props) {
	function connectedToValidServer() {
		const serverConfig = props.serverSettings.serverConfig;
		return serverConfig && serverConfig.serverName;
	}
	const serverName = connectedToValidServer() ? props.serverSettings.serverConfig.serverName : UNKNOWN_SERVER_NAME;
	const linkStatusSymbol = connectedToValidServer() ? UNICODE_LINK_SYMBOL : UNICODE_WARNING_SIGN;

	return (
		<div className="vertical-center tco-text">
			<Container>
				<div className="my-dropdown">
					{linkStatusSymbol} Connected to{" "}
					<div className="div-inline">
						<ServersDropdown {...props} serverName={serverName} />
					</div>
					&nbsp;&nbsp;
					<a data-testid="help-button" onClick={props.stateMethods.toggleFeaturesChecklist}><FaInfoCircle size={18} /></a>
					<FeaturesChecklist isOpen={props.stateVariables.featuresChecklistOpen} toggleOpen={props.stateMethods.toggleFeaturesChecklist} features={props.stateVariables.featuresRecieved}/>
				</div>
			</Container>
		</div>
	);
}

function ServersDropdown(props) {
	const [dropdownOpen, setDropdownOpen] = useToggle(false);
	return (
		<Dropdown isOpen={dropdownOpen} toggle={setDropdownOpen} direction="up" size="sm" data-testid="interop-dropdown">
			<DropdownToggle caret>{props.serverName}</DropdownToggle>
			<DropdownMenu data-testid="interop-dropdown-menu">
				{avaliableServers.map((server, index) => (
					<DropdownItem
						data-testid="dropdownitem"
						key={`table-${JSON.stringify(server)}-${index}`}
						onClick={() => changeServers(server, props.stateMethods, props.stateVariables, props.showMessage)}
					>
						{server.teamName}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
}
	

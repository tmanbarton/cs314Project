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

const UNICODE_LINK_SYMBOL = "\uD83D\uDD17";
const UNICODE_WARNING_SIGN = "\u26A0";
const UNKNOWN_SERVER_NAME = "Unknown";

const supportedFeatures = ["config", "find", "distances"];

export default function Footer(props) {
	const [featuresChecklistOpen, toggleFeaturesChecklist] = useToggle(false);
	const [featuresRecieved, setFeaturesRecieved] = useState(supportedFeatures);
	let stateMethods = {
		toggleFeaturesChecklist: toggleFeaturesChecklist,
		setFeaturesRecieved: setFeaturesRecieved,
		setDisableSearch: props.setDisableSearch,
		processServerConfigSuccess: props.processServerConfigSuccess,
	};
	let stateVariables = {
		featuresChecklistOpen: featuresChecklistOpen,
		featuresRecieved: featuresRecieved,
		disableSearch: props.disableSearch,
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

function evaluateFeatures(avaliableFeatures, stateMethods, stateVariables) {
	for (let i = 0; i < supportedFeatures.length; i++) {
		if (supportedFeatures[i] == "find") {
			if (
				(avaliableFeatures.indexOf(supportedFeatures[i]) == -1 &&
					!stateVariables.disableSearch) ||
				(avaliableFeatures.indexOf(supportedFeatures[i]) > -1 &&
					stateVariables.disableSearch)
			) {
				stateMethods.setDisableSearch();
			}
		}
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
			{ setDisableSearch: stateMethods.setDisableSearch },
			{ disableSearch: stateVariables.disableSearch }
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
	const serverName = connectedToValidServer()
		? props.serverSettings.serverConfig.serverName
		: UNKNOWN_SERVER_NAME;
	const linkStatusSymbol = connectedToValidServer()
		? UNICODE_LINK_SYMBOL
		: UNICODE_WARNING_SIGN;

	const [dropdownOpen, setDropdownOpen] = useToggle(false);

	return (
		<div className="vertical-center tco-text">
			<Container>
				<div className="my-dropdown">
					{linkStatusSymbol} Connected to{" "}
					<div className="div-inline">
						<Dropdown
							isOpen={dropdownOpen}
							toggle={setDropdownOpen}
							direction="up"
							size="sm"
							data-testid="interop-dropdown"
						>
							<DropdownToggle caret>{serverName}</DropdownToggle>
							<DropdownMenu data-testid="interop-dropdown-menu">
								{avaliableServers.map((server, index) => (
									<DropdownItem
										key={`table-${JSON.stringify(server)}-${index}`}
										onClick={() =>
											changeServers(
												server,
												props.stateMethods,
												props.stateVariables,
												props.showMessage
											)
										}
									>
										{server.teamName}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
					<br />
					<a
						className="tco-text"
						onClick={props.stateMethods.toggleFeaturesChecklist}
					>
						({props.serverSettings.serverUrl}).
					</a>
					<FeaturesChecklist
						isOpen={props.stateVariables.featuresChecklistOpen}
						toggleOpen={props.stateMethods.toggleFeaturesChecklist}
						features={props.stateVariables.featuresRecieved}
						supportedFeatures={supportedFeatures}
					/>
				</div>
			</Container>
		</div>
	);
}

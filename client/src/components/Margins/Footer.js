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

const supportedFeatures = ["config", "find"];

export default function Footer(props) {
	const [featuresChecklistOpen, toggleFeaturesChecklist] = useToggle(false);
	const [featuresRecieved, setFeaturesRecieved] = useState(["config", "find"]);

	return (
		<div className="full-width footer">
			<ServerInformation
				toggleFeaturesChecklist={toggleFeaturesChecklist}
				featuresChecklistOpen={featuresChecklistOpen}
				showMessage={props.showMessage}
				featuresRecieved={featuresRecieved}
				setFeaturesRecieved={setFeaturesRecieved}
				setDisableSearch={props.setDisableSearch}
				disableSearch={props.disableSearch}
				{...props}
			/>
		</div>
	);
}

function evaluateFeatures(avaliableFeatures, stateMethods, states) {
	for (let i = 0; i < supportedFeatures.length; i++) {
		if (supportedFeatures[i] == "find") {
			if (
				(avaliableFeatures.indexOf(supportedFeatures[i]) == -1 &&
					!states.disableSearch) ||
				(avaliableFeatures.indexOf(supportedFeatures[i]) > -1 &&
					states.disableSearch)
			) {
				stateMethods.setDisableSearch();
			}
		}
	}
}

async function changeServers(server, stateMethods, states, showMessage) {
	const baseUrl = "https://localhost:";
	const newUrl = baseUrl + server.extension;
	const response = await sendAPIRequest({ requestType: "config" }, newUrl);

	if (response) {
		stateMethods.processServerConfigSuccess(response, newUrl);
		stateMethods.setFeaturesRecieved(response.features);
		evaluateFeatures(
			response.features,
			{ setDisableSearch: stateMethods.setDisableSearch },
			{ disableSearch: states.disableSearch }
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
						>
							<DropdownToggle caret>{serverName}</DropdownToggle>
							<DropdownMenu>
								{avaliableServers.map((server, index) => (
									<DropdownItem
										key={`table-${JSON.stringify(server)}-${index}`}
										onClick={() =>
											changeServers(
												server,
												{
													toggleFeaturesChecklist: props.toggleFeaturesChecklist,
													setFeaturesRecieved: props.setFeaturesRecieved,
													setDisableSearch: props.setDisableSearch,
													processServerConfigSuccess:
														props.processServerConfigSuccess,
												},
												{ disableSearch: props.disableSearch },
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
					<a className="tco-text" onClick={props.toggleFeaturesChecklist}>
						({props.serverSettings.serverUrl}).
					</a>
					<FeaturesChecklist
						isOpen={props.featuresChecklistOpen}
						toggleOpen={props.toggleFeaturesChecklist}
						features={props.featuresRecieved}
						supportedFeatures={supportedFeatures}
					/>
				</div>
			</Container>
		</div>
	);
}

import React, { useState } from "react";
import {
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from "reactstrap";
import { useToggle } from "../../hooks/useToggle";
import ServerSettings from "./ServerSettings";
import { avaliableServers } from "./avalibleServers";
import { sendAPIRequest } from "../../utils/restfulAPI";

const UNICODE_LINK_SYMBOL = "\uD83D\uDD17";
const UNICODE_WARNING_SIGN = "\u26A0";
const UNKNOWN_SERVER_NAME = "Unknown";

export default function Footer(props) {
	const [serverSettingsOpen, toggleServerSettings] = useToggle(false);
	const [featuresRecieved, setFeaturesRecieved] = useState(["config", "find"]);

	return (
		<div className="full-width footer">
			<ServerInformation
				toggleServerSettings={toggleServerSettings}
				serverSettingsOpen={serverSettingsOpen}
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

function evaluateFeatures(
	avaliableFeatures,
	featureItem,
	toggle,
	disableSearch
) {
	if (
		(avaliableFeatures.indexOf(featureItem) == -1 && !disableSearch) ||
		(avaliableFeatures.indexOf(featureItem) > -1 && disableSearch)
	) {
		toggle();
	}
}

async function changeServers(
	server,
	processServerConfigSuccess,
	toggleServerSettings,
	setFeaturesRecieved,
	showMessage,
	setDisableSearch,
	disableSearch
) {
	const baseUrl = "https://localhost:";
	const newUrl = baseUrl + server.extension;
	const response = await sendAPIRequest({ requestType: "config" }, newUrl);

	if (response) {
		processServerConfigSuccess(response, newUrl);
		setFeaturesRecieved(response.features);
		evaluateFeatures(
			response.features,
			"find",
			setDisableSearch,
			disableSearch
		);
		toggleServerSettings();
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
												props.processServerConfigSuccess,
												props.toggleServerSettings,
												props.setFeaturesRecieved,
												props.showMessage,
												props.setDisableSearch,
												props.disableSearch
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
					<a className="tco-text" onClick={props.toggleServerSettings}>
						({props.serverSettings.serverUrl}).
					</a>
					<ServerSettings
						isOpen={props.serverSettingsOpen}
						processServerConfigSuccess={props.processServerConfigSuccess}
						toggleOpen={props.toggleServerSettings}
						serverSettings={props.serverSettings}
						featuresRecieved={props.featuresRecieved}
					/>
				</div>
			</Container>
		</div>
	);
}

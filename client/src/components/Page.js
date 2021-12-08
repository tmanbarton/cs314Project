import React, { useEffect, useState } from 'react';
import { Collapse, Button } from 'reactstrap';
import { FaMap } from 'react-icons/fa';
import Header from './Margins/Header';
import Footer from './Margins/Footer';
import About from './About/About';
import Planner from './Trip/Planner';
import { useToggle } from '../hooks/useToggle';
import { LOCAL_STORAGE_KEY, LOG } from '../utils/constants';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';

export default function Page(props) {
	const [showAbout, toggleAbout] = useToggle(false);
	const [serverSettings, processServerConfigSuccess] = useServerSettings(props.showMessage);
	const [disableSearch, setDisableSearch] = useToggle(false);
	const [disableTour, setDisableTour] = useToggle(false);
	const [showMap, toggleMap] = useToggle(true);
	const [firstTime, setFirstTime] = useState(!localStorage.getItem(LOCAL_STORAGE_KEY));
	const [featuresChecklistOpen, toggleFeaturesChecklist] = useToggle(firstTime);

	return (
		<>
			<Header toggleAbout={toggleAbout} />
			<div className="body">
				<Collapse isOpen={showAbout}>
					<About closePage={toggleAbout} />
				</Collapse>
				<Collapse isOpen={!showAbout} data-testid="planner-collapse">
					<Planner serverSettings={serverSettings} disableSearch={disableSearch} disableTour={disableTour} showMessage={props.showMessage} showMap={showMap}/>
				</Collapse>
			</div>
			<div className="fab-div" hidden={showAbout}>
				<Button size="lg" color="primary" style={{borderRadius: 100, display: 'float-right'}} onClick={() => mapToggle(showMap, toggleMap)}><FaMap /></Button>
			</div>
			<Footer
				disableSearch={disableSearch}
				setDisableSearch={setDisableSearch}
				disableTour={disableTour}
				setDisableTour={setDisableTour}
				showMessage={props.showMessage}
				serverSettings={serverSettings}
				processServerConfigSuccess={processServerConfigSuccess}
				featuresChecklistOpen={featuresChecklistOpen}
				toggleFeaturesChecklist={toggleFeaturesChecklist}
			/>
		</>
	)
}

function mapToggle(showMap, toggleMap){
	const show = !showMap;
	toggleMap();
	if(show){
		window.scroll({top: '14vh', behavior: 'smooth'});
	}
}

function useServerSettings(showMessage) {
	const [serverUrl, setServerUrl] = useState(getOriginalServerUrl());
	const [serverConfig, setServerConfig] = useState(null);

	useEffect(() => {
		sendConfigRequest();
	}, []);

	function processServerConfigSuccess(config, url) {
		LOG.info("Switching to Server:", url);
		setServerConfig(config);
		setServerUrl(url);
	}

	async function sendConfigRequest() {
		const configResponse = await sendAPIRequest({ requestType: "config" }, serverUrl);
		if (configResponse) {
			processServerConfigSuccess(configResponse, serverUrl);
		} else {
			setServerConfig(null);
			showMessage(`Config request to ${serverUrl} failed. Check the log for more details.`, "error");
		}
	}

	return [{ serverUrl: serverUrl, serverConfig: serverConfig }, processServerConfigSuccess];
}

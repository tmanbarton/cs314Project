import ulog from 'ulog';

export function setLogLevelIfDefault() {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    if (!urlParams.has("log")) {
        if (process.env.CLIENT_LOG_LEVEL === "INFO") {
            ulog.level = ulog.INFO;
        } else {
            ulog.level = ulog.ERROR;
        }
    }
}

setLogLevelIfDefault();

export const LOG = ulog("App");

export const CLIENT_TEAM_NAME = "t13 Penguinz";

export const EARTH_RADIUS_UNITS_DEFAULT = { "miles": 3959 };

export const DEFAULT_STARTING_PLACE = { latitude: 40.5734, longitude: -105.0865 };

export const DEFAULT_RESPONSE_TIME = 1;

export const LOCAL_STORAGE_KEY = "DEFAULT MAP";

export const SUPPORTED_FEATURES = [
	{
		name: "find",
		description:
			"Select the search icon to search for a place by name. Use the globe icon to switch to searching by coordinates and the dice icon to generate random places.",
	},
	{
		name: "distances",
		description:
			"The total distance of your trip is shown at the top and bottom of your itinerary. The cumulative distance is shown when you expand the individual locations.",
	},
	{
		name: "tour",
		description:
			'You can edit your trip by dragging and dropping with the drag handles, or with the options in the "Modify" menu: optimize your trip to get a shorter route, shuffle the order the trip, reverse the trip, or remove all of the locations.',
	},
    {
        name: "load",
        description: ""
    }
];
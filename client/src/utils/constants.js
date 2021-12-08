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
			"You can optimize your trip in order to shorten the total distance. The 'Optimize' button can be found in the 'Modify' menu.",
	},
	{
		name: "modify",
		description:
			"You can edit your trip by dragging and dropping with the drag handles. By using the 'Modify' menu, you can shuffle or reverse current trip.",
	},  
    {
		name: "load",
		description: "You can load a previously saved trip via the 'File' button.",
	},
	{
		name: "save",
		description:
			"You can save and download your current trip as a JSON or CSV via the 'File' button.",
	},
	{
		name: "locate",
		description:
			"You can click on the 'Locate' button near the map to add your current position to the start of your trip.",
	},
];
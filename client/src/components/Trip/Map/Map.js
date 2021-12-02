import React from 'react';
import { Map as LeafletMap, Polyline, LayersControl, TileLayer } from 'react-leaflet';
import Marker from './Marker';
import { latLngToPlace, placeToLatLng } from '../../../utils/transformers';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';
import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
const LOCAL_STORAGE_KEY = "DEFAULT MAP";
let MAP_LAYERS = [
    {
      selected: false,
      name: "Default Map",
      attribution: MAP_LAYER_ATTRIBUTION,
      url: MAP_LAYER_URL,
    },
     {
      selected: false,
      name: "Topographic",
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    },
    {
      selected: false,
      name: "Satellite",
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    },
    {
        selected: false,
        name: "Sea",
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
    },
  ];

export default function Map(props) {
    function handleMapClick(mapClickInfo) {
        props.placeActions.append(latLngToPlace(mapClickInfo.latlng));
    }

    checkMapSelection();

    return (
        <LeafletMap
            className="mapStyle"
            boxZoom={false}
            useFlyTo={true}
            zoom={15}
            tap={false}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={placeToLatLng(DEFAULT_STARTING_PLACE)}
            onClick={handleMapClick}
            data-testid="Map"
        >
            {/* <LayersControl className="smaller" position="topright">
                {MAP_LAYERS.map(
                    layerData => renderMapLayer(layerData)
                    )}
            </LayersControl> */}
            <TileLayer {...MAP_LAYERS[0]} />
            <TripLines places={props.places} />
            <PlaceMarker places={props.places} selectedIndex={props.selectedIndex} />
        </LeafletMap>
    );
}

function renderMapLayer(layerData) {
    return (
      <LayersControl.BaseLayer checked={layerData.selected} name={layerData.name} >
        <TileLayer {...layerData} onloading={()=> localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(layerData))}/>
      </LayersControl.BaseLayer>
    );
  }

function TripLines(props) {
    const pathData = computePaths(props.places);
    return pathData.map((path, index) =>
        <Polyline
            key={`${JSON.stringify(path)}-${index}`}
            positions={path}
        />
    );
}

function computePaths(places) {
    if (places.length < 2) {
        return [];
    }
    const pathPointPairs = [];
    for (let i = 0; i < places.length; i++) {
        const fromPlace = places[i];
        const toPlace = places[(i+1) % places.length];
        pathPointPairs.push([placeToLatLng(fromPlace),placeToLatLng(toPlace)]);
    }
    return pathPointPairs;
}

function PlaceMarker({places, selectedIndex}) {
    if (selectedIndex === -1) {
        return null;
    }
    return <Marker place={places[selectedIndex]} />;
}

function checkMapSelection() {    
	if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        const defaultMap = MAP_LAYERS.find((mapLayer) => {
            return (
                mapLayer.name === JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).name &&
                mapLayer.url === JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).url
            );
        });
		MAP_LAYERS[MAP_LAYERS.indexOf(defaultMap)].selected = true;
	} else {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MAP_LAYERS[0]));
		MAP_LAYERS[0].selected = true;
	}
}

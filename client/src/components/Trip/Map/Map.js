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
const MAP_LAYERS = [
    {
      selected: true,
      name: "Open Street Map",
      attribution: MAP_LAYER_ATTRIBUTION,
      url: MAP_LAYER_URL,
    },
  ];

export default function Map(props) {
    function handleMapClick(mapClickInfo) {
        props.placeActions.append(latLngToPlace(mapClickInfo.latlng));
    }

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
        <LayersControl className="smaller" position="topright">
            {MAP_LAYERS.map(
                layerData => renderMapLayer(layerData)
                )}
      </LayersControl>
            <TripLines places={props.places} />
            <PlaceMarker places={props.places} selectedIndex={props.selectedIndex} />
        </LeafletMap>
    );
}

function renderMapLayer(layerData) {
    return (
      <LayersControl.BaseLayer checked={layerData.selected} name={layerData.name}>
        <TileLayer {...layerData} />
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
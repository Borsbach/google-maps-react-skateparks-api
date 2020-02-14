import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as parksData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
      defaultOptions={{ styles: mapStyles}}
    >
      {parksData.features.map((park) => (
        <Marker 
          key={park.attributes.PARK_ID} 
          position={{ 
            lat: park.geometry.y, 
            lng: park.geometry.x 
          }}
          onClick={() => {
            setSelectedPark(park)
          }}
          icon={{
            url: '/images/1024px-Pictograms-nps-land-skateboarding.png',
            scaledSize: new window.google.maps.Size(25, 25)
          }}
          />
      ))}

      {selectedPark && (
        <InfoWindow
          position={{
            lat: selectedPark.geometry.y, 
            lng: selectedPark.geometry.x 
          }}
          onCloseClick={() =>{
            setSelectedPark(null)
          }}
        >
          <div>
            <h2>{selectedPark.attributes.NAME}</h2>
            <p>{selectedPark.attributes.DESCRIPTION}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}

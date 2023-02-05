import { React, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { FindMeButton } from "./FindMeButton";

const containerStyle = {
    width: '400px',
    height: '400px'
  };

const libraries = ['places']

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const {isLoaded, loadError} = useJsApiLoader({
    //move to env
    googleMapsApiKey: process.env.REACT_APP_API_KEY, 
    libraries: {libraries}
  })
  //re-center the map
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  //set marker locations
  const [markers, setMarkers] = useState([])

  const success = (position) => {
    const newPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(newPosition);
  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(success);
  };
  

  if(!isLoaded) {
    return <p>Loading...</p>
  }

  else if (loadError) {
    return <p>Error with google maps</p>
  }

  else if (!currentPosition.lat || !currentPosition.lng) {
    return <FindMeButton findMe={getCurrentPosition} />
  }


    return (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={10}
        >
          <Marker 
            position={currentPosition}  
          />
        </GoogleMap>
      </>
    )
  }


export default Map;

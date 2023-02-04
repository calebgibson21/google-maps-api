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
  const {isLoaded} = useJsApiLoader({
    //move to env
    googleMapsApiKey:"AIzaSyAhlvbsoiY5sc-h2_7l3azuyVoeeYyrMsg", 
    libraries: {libraries}
  })

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

   if (!currentPosition.lat || !currentPosition.lng) {
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

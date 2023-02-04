import { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: '400px',
    height: '400px'
  };

const libraries = ['places']

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

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

  if (!currentPosition.lat || !currentPosition.lng) {
    return <button onClick={getCurrentPosition}>Get Current Position</button>
  }

  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyAhlvbsoiY5sc-h2_7l3azuyVoeeYyrMsg"
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={10}
        />
      </LoadScript>
    </div>
  );
};

export default Map;

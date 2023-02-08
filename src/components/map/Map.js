import { React, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import Button from "../UI/Buttons/Button";
import MapContainer from "../UI/Containers/MapContainer";
import Loader from "../UI/Loader/Loader";

const containerStyle = {
    width: '400px',
    height: '400px'
  };

const libraries = ['places'];

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);

  //loads the google maps API
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY, 
    libraries
  })

  // //re-center the map
  // const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // //set marker locations
  // const [markers, setMarkers] = useState([])

  //gets the current position of the user
  const success = (position) => {
    const newPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(newPosition);
    setLoading(false);
  };

  //sets the current position state to the user's current position
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(success);
  };

  function handleFindMe() {
    setLoading(true);
    getCurrentPosition();
  }
  

  if(!isLoaded) {
    return <p>Loading...</p>
  }

  else if (loadError) {
    return <p>Error with google maps</p>
  }

  else if (loading) {
    return <Loader />
  }

  //only shows the map if the user has given permission to get their location
  else if (!currentPosition.lat || !currentPosition.lng) {
    return (
    <>
      <MapContainer />
      <Button onClick={handleFindMe}>Find Me</Button>
    </>
    )
  }

    return (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={10}
        >
          <MarkerF
            position={currentPosition}  
          />

        </GoogleMap>
      </>
    )
  }


export default Map;

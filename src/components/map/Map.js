import { React, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
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
  const [searchBox, setSearchBox] = useState(null);
  const [markers, setMarkers] = useState([]);


  //loads the google maps API
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY, 
    libraries
  })

  const onPlacesChanged = () => {if(searchBox) {
    let markerArray = [];
    let results = searchBox.getPlaces();
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      let lat = results[i].geometry.location.lat; 
      let lng = results[i].geometry.location.lng;

      let position = {
        lat: lat(),
        lng: lng()
      }
      markerArray.push(position)
      // let place = results[i].geometry.location;
      // 
    }
    setMarkers(markerArray)
    console.log(markerArray[0])
  }
}

    // console.log(searchBox.getPlaces())}}
    
  const onSBLoad = (ref) => setSearchBox(ref) 

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
      <input type="text" placeholder="Search for a location" />
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
            position={markers[0]}  
          />
        </GoogleMap>
        <StandaloneSearchBox 
          onLoad={onSBLoad}
          onPlacesChanged={onPlacesChanged}
          >
            <input type="text" placeholder="Search for a location" />
        </StandaloneSearchBox>

      </>
    )
  }


export default Map;

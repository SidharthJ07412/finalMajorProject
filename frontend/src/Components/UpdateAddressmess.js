import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Navbar from "./Navbar";
import Cookies from "universal-cookie";
import styles from "../ComponentStyles/Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UpdateAddressmess = () => {

    const cookies = new Cookies();
    const User_id = cookies.get("User").User_id;
   const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0});
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 22.719534, lng: 75.873452 });
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoContent, setInfoContent] = useState('');

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setShowMap(true);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    console.log('New coordinates:', coordinates);
    setShowMap(true);
  }, [coordinates]); // This useEffect hook runs whenever `coordinates` changes
  

  const mapContainerStyle = {
    width: '100%',
    height: '70vh', 
  };
  
  const handleSubmit = () => {
    axios
    .post("https://healthymealz22-04-24f.onrender.com/Mess_owner/update_address_mess/", {
      "User_id": User_id,
      "lat": parseFloat(location.lat.toFixed(6)),
      "lng": parseFloat(location.lng.toFixed(6)),
      "user_address": address
    })
    .then((res) => {
      console.log(res.data);
    });
    console.log('Address:', address);
    console.log('Coordinates:',location);
    console.log('haha',coordinates);
    console.log(address);
  };
 
  const onDragEnd = (e) => {
    const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setLocation(newPosition);
    setInfoContent(`Pin dropped at: ${newPosition.lat}, ${newPosition.lng}`);
    setInfoOpen(true);
  };
  
  const onCloseClick = () => {
    setInfoOpen(false);
  };

  const settrue = () => {
    setShowMap(true);
  };

  return (
    <><Navbar/>
   
    <div>
    {getCurrentPosition}
    <button class="real button" onClick={settrue}>Fetch Location</button>
    <div class="small-text"></div>
    <span style={{ fontSize: '12px' }}>first Click on the "Fetch Location" button for fetching correct coordinate and you can point marker also</span>
  
    {showMap && coordinates!={ lat: 22.719534, lng: 75.873452 } && (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          center={coordinates}
          zoom={11.5}
          mapContainerStyle={mapContainerStyle}
        >
          {coordinates && (
            <Marker
              key={`${coordinates.lat}-${coordinates.lng}`}
              position={coordinates}
              draggable={true}
              title="This marker is draggable."
              onDragEnd={onDragEnd}
            />
          )}
          {infoOpen && (
            <InfoWindow
              position={location}
              onCloseClick={onCloseClick}
            >
              <div>{infoContent}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    )}
  
  <input
  class="real"
  type="text"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Update address"
  style={{ backgroundColor: 'white' }} // Add this line
/>
    <button class="real button"  onClick={handleSubmit}>Submit</button>
  </div>
 </>
  );

};

export default UpdateAddressmess;
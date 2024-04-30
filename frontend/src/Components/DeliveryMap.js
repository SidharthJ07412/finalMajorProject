import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import Cookies from "universal-cookie";
import Navbar from './Navbar';

const containerStyle = {
  width: '100%',
  height: '520px'
};

const center = {
  lat: 22.722662,
  lng: 75.884297
};

const DeliveryMap = () => {
  const [waypoints, setWaypoints] = useState([]);
  const [response, setResponse] = useState(null);
  const [routeFetched, setRouteFetched] = useState(false);
  const [Mess_id, update_Mess_id] = useState(null);
  const [mess_users, update_mess_users] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const[mess_loc, update_mess_loc]= useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 22.719534, lng: 75.873452 });
  const [mapCenter, setMapCenter] = useState(center);
  const [status, update_status] = useState('');


  const cookies = new Cookies();
  let deliver_id = cookies.get("User").User_id;

  const fetch_mess_id = async () => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/fetch_mess_id/",
      {
        "deliver_id":deliver_id
      })
      .then((res) => {
        update_Mess_id({
          id: res.data.mess_id,
          location: {
            lat: parseFloat(res.data.lat),
            lng: parseFloat(res.data.log)
          }
        });
      });
  };

  const fetch_del_status = async()=> {
    await axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/fetch_del_status/",
        {
          "Mess_id":Mess_id.id
        })
      .then((res) => {
        console.log(res.data);
        update_status(res.data.dstatus);
      });
  }

  useEffect(() => {
    console.log('New coordinates:', coordinates);
  }, [coordinates]);

  const fetch_mess_users = async () => {
    await 
    axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/fetch_mess_users/",
      {
        "Mess_id":Mess_id.id
      })
      .then((res) => {
        update_mess_users(res.data)
        console.log(res.data);
      });
  };

  const fetch_mess_loc = async()=> {
    await axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/fetch_mess_loc/",
        {
          "Mess_id": Mess_id.id
        })
      .then((res) => {
        console.log(res.data);
        update_mess_loc(res.data);
      });
  }

  const set_del_status = async()=> {
    await axios
      .post("https://healthymealz22-04-24f.onrender.com/Delivery_boy/set_del_status/",
        {
          "Mess_id":Mess_id.id
        })
      .then((res) => {
        console.log(res.data);
        update_status(res.data);
        window.location.reload();
      });
  }

  

  // const getCurrentPosition = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setCoordinates({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //       setMapCenter(coordinates);
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // };

  useEffect(() => {
    fetch_mess_id();
  }, []);

  useEffect(() => {
    update_status(status);
  }, []);



  useEffect(() => {
    if (Mess_id) {
      fetch_mess_users();
      fetch_mess_loc();
      fetch_del_status();
    }
  }, [Mess_id]);


  useEffect(() => {
    if (mess_users.length > 0) {
      const usersAsWaypoints = mess_users.map(user => ({
        location: { lat: parseFloat(user.lat), lng: parseFloat(user.log) },
        stopover: false,
        id: user.id
      }));
      const sortedWaypoints = sortWaypoints(usersAsWaypoints);
     // const lastWaypoint = sortedWaypoints.pop();
      setWaypoints(sortedWaypoints);
     
    }
  }, [mess_users]);

  function sortWaypoints(waypoints) {
    const sortedWaypoints = [waypoints[0]];
    const remainingWaypoints = waypoints.slice(1);

    while (remainingWaypoints.length > 0) {
      let closestWaypointIndex;
      let closestWaypointDistance = Infinity;

      for (let i = 0; i < remainingWaypoints.length; i++) {
        const distance = getDistance(
          sortedWaypoints[sortedWaypoints.length - 1].location,
          remainingWaypoints[i].location
        );

        if (distance < closestWaypointDistance) {
          closestWaypointIndex = i;
          closestWaypointDistance = distance;
        }
      }

      sortedWaypoints.push(remainingWaypoints[closestWaypointIndex]);
      remainingWaypoints.splice(closestWaypointIndex, 1);
    }

    return sortedWaypoints.map(({ location, stopover }) => ({ location, stopover }));
  }

  function getDistance(location1, location2) {
    const latDiff = location1.lat - location2.lat;
    const lngDiff = location1.lng - location2.lng;
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  }

  const directionsCallback = (response) => {
    if (response !== null) {  
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('response: ', response)
      }
    }
  }

  

  const handleOnClick = () => {
    setRouteFetched(true);
    setResponse(null);
    console.log(waypoints);

  }

  const openGoogleMaps = () => {
    const origin = `${mess_loc.lat},${mess_loc.log}`;
    const destination = `${mess_loc.lat},${mess_loc.log}`;

    const waypointsString = waypoints.map(waypoint => `${waypoint.location.lat},${waypoint.location.lng}`).join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypointsString}&travelmode=driving`;

    // Open the URL in a new tab or window
    window.open(url, '_blank');
  };

  return (
    <section>
      <Navbar/>
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    > 
         <button
          onClick={openGoogleMaps}
          className="bg-teal-500 text-white px-4 py-2 mx-2 mb-7 rounded-md focus:outline-none float-left mr-4"
        >
          Start Navigation with Google Maps
        </button>
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
  {
  coordinates && (
    <Marker
      key={`${coordinates.lat}-${coordinates.lng}`}
      position={coordinates}
      title="This is delivery boy location."
      icon={{
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }}
    />
  )
}

        {
          routeFetched && response === null && (
            <DirectionsService
              options={{
                destination: { lat: parseFloat(mess_loc.lat), lng: parseFloat(mess_loc.log) },
                origin: { lat: parseFloat(mess_loc.lat), lng: parseFloat(mess_loc.log) },
                travelMode: 'DRIVING',
                waypoints: waypoints
              }}
              callback={directionsCallback}
            />
          )
        }
        
  
        {
          response !== null && (
            
            <DirectionsRenderer
              options={{
                directions: response
              }}
            />
          )
        }
  
        <Marker
          key={mess_loc.id}
          position={{ lat: parseFloat(mess_loc.lat), lng: parseFloat(mess_loc.log) }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}
          onClick={() => {
            setSelectedUser({ fname: 'mess happy' });
          }}
        />
  
        {
          mess_users.map(user => (
            <Marker
              key={user.id}
              position={{ lat: parseFloat(user.lat), lng: parseFloat(user.log) }}
              onClick={() => {
                setSelectedUser(user);
              }}
            />
          ))
        }
  
        {
          selectedUser && (
            <InfoWindow
              position={{ lat: parseFloat(selectedUser.lat || mess_loc.lat), lng: parseFloat(selectedUser.log || mess_loc.log) }}
              onCloseClick={() => {
                setSelectedUser(null);
              }}
            >
              <div>
                <h2>{selectedUser.fname}</h2>
              </div>
            </InfoWindow>
          )
        }
      </GoogleMap>
      </div>
    
        
        <div> <text> Current  Delivery Status : {status}</text></div>
          <button
          onClick={handleOnClick}
          className="bg-teal-500 text-white px-4 py-2 mx-2 mb-7 rounded-md focus:outline-none float-left mr-4"
        >
          Map Route
        </button>
       <button class="real button" onClick={set_del_status}> Change status </button>
    </LoadScript></section>
  )
}

export default DeliveryMap;

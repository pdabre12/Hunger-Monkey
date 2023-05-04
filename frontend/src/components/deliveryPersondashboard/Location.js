import React, { useState, useEffect } from 'react';

function MapWithGeocode() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('');
  const [geocoder, setGeocoder] = useState(null);
  const[updated,setUpdated] = useState(false)

  useEffect(() => {
    // Create the map and the geocoder

    const initMap = () =>{
      const google = window.google;
    const mapOptions = {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 12,
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const geocoder = new google.maps.Geocoder();
    setMap(map);
    setGeocoder(geocoder);
    if(window){
      initMap();
    }
    else{
        // Window is not available yet, add event listener
        window.addEventListener('load', initMap);
      }
  
      return () => {
        window.removeEventListener('load', initMap);
    }
  }
   
  }, [window]);

  function handleGeocodeClick() {
    // Send a geocoding request
    const apiKey = 'AIzaSyCaR2W_KsJlRo59ohQJMo34-Wm1rxbAsp4';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
            console.log(data)
          const location = data.results[0].geometry.location;
          console.log(location)
          // map.setCenter(location);

          // // Add a marker to the map
          // if (marker) {
          //   marker.setPosition(location);
          // } else {
          //   const marker = new window.google.maps.Marker({
          //     position: location,
          //     map: map,
          //   });
          //   setMarker(marker);
          // }
        } else {
          alert('Geocode was not successful for the following reason: ' + data.status);
        }
      })
      .catch((error) => {
        alert('Geocode request failed: ' + error.message);
      });
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" value={address} onChange={handleAddressChange} />
        <button onClick={handleGeocodeClick}>Geocode</button>
      </div>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
}

export default MapWithGeocode;

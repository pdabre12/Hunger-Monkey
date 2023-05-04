import React from "react";
import GoogleMapAutocomplete from "react-google-autocomplete";
import GoogleMapReact from "google-map-react";
import { useState } from "react";


const Maps = () => {
        const [address, setAddress] = useState('');
        return (
          <div>
            <form>
              <GoogleMapAutocomplete
                placeholder="Enter your address"
                onPlaceSelected={(place) => {
                  setAddress(place.formatted_address);
                }}
                types={['address']}
                componentRestrictions={{ country: ['us','ca'] }}
              />
              <button type="submit">Submit</button>
            </form>
            <div style={{ height: '500px', width: '100%' }}>
              <GoogleMapReact
                // bootstrapURLKeys={{ key: 'AIzaSyCaR2W_KsJlRo59ohQJMo34-Wm1rxbAsp4' }}
                defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                defaultZoom={12}
              />
            </div>
          </div>
        );
      }
      

export default Maps;

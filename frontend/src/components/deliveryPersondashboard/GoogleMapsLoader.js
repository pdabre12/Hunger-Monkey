import React, { useEffect } from "react";

const GoogleMapsLoader = ({ apiKey }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.defer = true;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  return null;
};

export default GoogleMapsLoader;

import { useEffect, useState } from "react";

type LocationBody = {
  isGeolocationEnabled: boolean;
  latitude: number;
  longitude: number;
  promptError: GeolocationPositionError | string;
};

const useLocation = () => {
  const [locationBody, setLocationBody] = useState<LocationBody>({
    isGeolocationEnabled: false,
    latitude: 0,
    longitude: 0,
    promptError: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationBody({
            isGeolocationEnabled: true,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            promptError: "",
          });
        },
        (err) => {
          setLocationBody({
            isGeolocationEnabled: false,
            latitude: 0,
            longitude: 0,
            promptError: err,
          });
        }
      );
    } else {
      setLocationBody({
        isGeolocationEnabled: false,
        latitude: 0,
        longitude: 0,
        promptError: "Geolocation is not supported by this browser",
      });
    }
  }, []);

  return locationBody;
};

export default useLocation;

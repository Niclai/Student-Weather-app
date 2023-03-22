import { FC, useState } from "react";
import { getCurrentLocation } from "../../api/location";
import { Location } from "../../types/location";
import LocationAutocomplete from "./LocationAutocomplete";

interface LocationSelectProps {
  location: Location | undefined;
  setLocation: (location: Location) => void;
}

import "./LocationSelect.css";

/**
 * Component for selecting a location using either Google Maps autocomplete
 * for searching for a location manually, or using the user's current GPS
 * coordinates. Displays the currently selected location and calls the
 * setLocation function upon update.
 */
const LocationSelect: FC<LocationSelectProps> = ({ location, setLocation }) => {
  const [isLoadingGPS, setLoadingGPS] = useState(false);

  const setGPSLocation = () => {
    setLoadingGPS(true);
    getCurrentLocation()
      .then(currentLocation => {
        setLocation(currentLocation);

        // hack used to rerender LocationAutocomplete with a new Id, causing its
        // input field to be cleared
      })
      .finally(() => setLoadingGPS(false));
  };

  return (
    <div className="container">
      <LocationAutocomplete handleLocationSelect={setLocation} />
      <button onClick={setGPSLocation}>Use current GPS location</button>
      {isLoadingGPS &&
        // TODO spinner
        ""}
      {location ? (
        <p className="currentLocation">Location set to: {location.name}</p>
      ) : (
        <p>Location not yet set</p>
      )}
    </div>
  );
};

export default LocationSelect;

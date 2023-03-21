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
  const [clearId, setClearId] = useState(0);
  const [isLoadingGPS, setLoadingGPS] = useState(false);

  const setGPSLocation = () => {
    setLoadingGPS(true);
    getCurrentLocation()
      .then(currentLocation => {
        setLocation(currentLocation);

        // hack used to rerender LocationAutocomplete with a new Id, causing its
        // input field to be cleared
        setClearId(prevClearId => prevClearId + 1);
      })
      .finally(() => setLoadingGPS(false));
  };

  return (
    <div className="container">
      <LocationAutocomplete
        location={location}
        handleLocationSelect={setLocation}
      />
      <button title="Use current GPS location" onClick={setGPSLocation} />
      {isLoadingGPS &&
        // <ActivityIndicator size="large" className="activityIndicator" />
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

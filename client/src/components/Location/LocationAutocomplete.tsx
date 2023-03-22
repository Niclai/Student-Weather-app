import { FC } from "react";
import Autocomplete from "react-google-autocomplete";

import { getCoordinates } from "../../api/location";
import { gmapsApiKey } from "../../env/variables";
import { Location } from "../../types/location";

import styles from "./LocationAutocomplete.module.scss";

interface LocationAutocompleteProps {
  handleLocationSelect: (location: Location) => void;
}

/**
 * Component for selecting a location using Google Maps autocomplete and
 * Geocoding APIs
 *
 * Does not check if the Maps API is reachable and will silently fail. Caller
 * should check if the Maps API is reachable before rendering this component to
 * detect any errors and display them to the user.
 */
const LocationAutocomplete: FC<LocationAutocompleteProps> = ({
  handleLocationSelect: setSelectedLocation,
}) => {
  return (
    <div className={styles.locationAutocomplete}>
      <Autocomplete
        className={styles.input}
        onPlaceSelected={async data => {
          if (data.formatted_address && data.place_id) {
            setSelectedLocation({
              name: data.formatted_address,
              coords: await getCoordinates(data.place_id),
            });
          }
        }}
        apiKey={gmapsApiKey}
      />
    </div>
  );
};

export default LocationAutocomplete;

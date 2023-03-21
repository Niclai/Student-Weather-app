import React, { FC, useEffect, useRef } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { getCoordinates } from "../../api/location";
import { Location } from "../../types/location";

import "./LocationAutocomplete.css";

interface LocationAutocompleteProps {
  location: Location | undefined;
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
  location,
  handleLocationSelect: setSelectedLocation,
}) => {
  return (
    <div>
      <GooglePlacesAutocomplete
        // selectProps={{
        //   value: location?.name,
        //   onChange: async data:  => {
        //     setSelectedLocation({
        //       name: data.description,
        //       coords: await getCoordinates(data.place_id),
        //     });
        //   },
        // }}
        apiKey={
          /* TODO get from environment variable, not as secure as using backend proxy but at least will not expose key in source code */ ""
        }
      />
    </div>
  );
};

export default LocationAutocomplete;

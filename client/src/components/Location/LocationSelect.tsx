import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getCoordinates } from "../../api/location";
import { baseUrl } from "../../env/variables";
import { Location } from "../../types/location";

const LocationSelect = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={async data => {
        setSelectedLocation({
          name: data.description,
          coords: await getCoordinates(data.place_id),
        });
      }}
      query={{
        language: "en",
      }}
      requestUrl={{
        url: `${baseUrl}/maps/api`,
        useOnPlatform: "all",
      }}
    />
  );
};

export default LocationSelect;

import { FC, useState } from "react";
import { Button, Text, View } from "react-native";
import { getCurrentLocation } from "../../api/location";
import { Location } from "../../types/location";
import LocationAutocomplete from "./LocationAutocomplete";

interface LocationSelectProps {
  location: Location | undefined;
  setLocation: (location: Location) => void;
}

const LocationSelect: FC<LocationSelectProps> = ({ location, setLocation }) => {
  const setGPSLocation = () => {
    getCurrentLocation().then(currentLocation => {
      setLocation(currentLocation);
      setClearId(prevClearId => prevClearId + 1);
    });
  };
  const [clearId, setClearId] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Use current GPS location" onPress={setGPSLocation} />
      <LocationAutocomplete
        handleLocationSelect={setLocation}
        clearId={clearId}
      />
      {location ? (
        <Text>Location set to: {location?.name}</Text>
      ) : (
        <Text>Location not yet set</Text>
      )}
    </View>
  );
};

export default LocationSelect;

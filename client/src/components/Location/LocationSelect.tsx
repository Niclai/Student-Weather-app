import { FC, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getCurrentLocation } from "../../api/location";
import { Location } from "../../types/location";
import LocationAutocomplete from "./LocationAutocomplete";

interface LocationSelectProps {
  location: Location | undefined;
  setLocation: (location: Location) => void;
}

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
    <View style={styles.container}>
      <Button title="Use current GPS location" onPress={setGPSLocation} />
      {isLoadingGPS && (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      )}

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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  activityIndicator: { position: "absolute", alignSelf: "center" },
});

export default LocationSelect;

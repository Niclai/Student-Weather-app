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
    <View style={styles.container}>
      <LocationAutocomplete
        handleLocationSelect={setLocation}
        clearId={clearId}
      />
      <Button title="Use current GPS location" onPress={setGPSLocation} />
      {isLoadingGPS && (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      )}
      {location ? (
        <Text style={styles.currentLocation}>
          Location set to: {location.name}
        </Text>
      ) : (
        <Text>Location not yet set</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  activityIndicator: {
    position: "absolute",
    alignSelf: "center",
  },
  currentLocation: {
    marginTop: 12,
    fontSize: 16,
  },
});

export default LocationSelect;

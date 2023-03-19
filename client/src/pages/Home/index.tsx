import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import Navbar from "../../components/Navbar";
import LocationSelect from "../../components/Location/LocationSelect";

// Types
import { Location } from "../../types/location";
import CurrentWeatherStats from "../../components/Weather/CurrentWeatherStats";
import { UserPreferencesContext } from "../../components/savePreferences";

const Home = () => {
  const [location, setLocation] = useState<Location>();
  const { userPreferences } = useContext(
    UserPreferencesContext
  );

  return (
    <View style={styles.wrapper}>
      <Navbar />
      <Text>Home</Text>
      {userPreferences && <Text>
        Max wind speed preference: { userPreferences?.maxWindSpeed }
      </Text>}
      <LocationSelect
        location={location}
        setLocation={location => setLocation(location)}
      />
      {location && <CurrentWeatherStats coordinates={location.coords} />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import Navbar from "../../components/Navbar";

// Types
import CurrentWeatherStats from "../../components/Weather/CurrentWeatherStats";
import { UserPreferencesContext } from "../../providers/UserPreferences";

const Home = () => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const location = userPreferences?.location;

  return (
    <View style={styles.wrapper}>
      <Navbar />
      <Text>Home</Text>
      {userPreferences && (
        <Text>Max wind speed preference: {userPreferences?.maxWindSpeed}</Text>
      )}
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

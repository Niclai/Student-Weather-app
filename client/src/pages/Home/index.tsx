import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import Navbar from "../../components/Navbar";
import LocationSelect from "../../components/Location/LocationSelect";

// Types
import { Location } from "../../types/location";
import WeatherStats from "../../components/Weather/WeatherStats";
import { WeatherConditions } from "../../types/weather";
import { getCurrentWeather } from "../../api/weather";

const Home = () => {
  const [location, setLocation] = useState<Location>();

  return (
    <View style={styles.wrapper}>
      <Navbar />
      <Text>Home</Text>
      <LocationSelect
        location={location}
        setLocation={location => setLocation(location)}
      />
      {location && (
        <WeatherStats
          isDay={true}
          weather={getCurrentWeather(location.coords)}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

import React, { useState } from "react";  
import { StyleSheet, Text, View } from "react-native";

// Components
import Navbar from "../../components/Navbar";
import LocationSelect from "../../components/Location/LocationSelect";


// Types
import { Location } from "../../types/location";
import CurrentWeatherStats from "../../components/Weather/CurrentWeatherStats";


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

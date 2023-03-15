import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Components
import Navbar from "../../components/Navbar";
import LocationSelect from "../../components/Location/LocationSelect";

// Types
import { MainStackParamList } from "../../types/navigationParams";
import { Location } from "../../types/location";
import WeatherStats from "../../components/Weather/WeatherStats";
import { WeatherConditions } from "../../types/weather";

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const [location, setLocation] = useState<Location>();

  return (
    <View style={styles.wrapper}>
      <Navbar />
      <Text>Home</Text>
      <LocationSelect
        location={location}
        setLocation={location => setLocation(location)}
      />
      <WeatherStats
        isDay={true}
        weather={{
          temperature: 13.2,
          windSpeed: 5,
          conditions: WeatherConditions.Fog,
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

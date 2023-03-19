import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import Navbar from "../../components/Navbar";
import LocationSelect from "../../components/Location/LocationSelect";

// Types
import { Location } from "../../types/location";
import NextStudySession from "../../components/Scheduling/NextStudySession";

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
        <NextStudySession
          coordinates={location.coords}
          userPreferences={{
            hayFever: false,
            timesPerWeek: 1,
            maxWindSpeed: 20,
            preferredMinTemp: 0,
            preferredMaxTemp: 50,
            timeBeforeNotif: 1,
            maxPollenLevels: 100,
            sessionDuration: 1,
          }}
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

import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import Navbar from "../../components/Navbar";

// Types
import NextStudySession from "../../components/Scheduling/NextStudySession";
import CurrentWeatherStats from "../../components/Weather/CurrentWeatherStats";

// Context
import { UserPreferencesContext } from "../../providers/UserPreferences";

const Home = () => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const location = userPreferences?.location;

  return (
    <View style={styles.wrapper}>
      <Navbar />
      <Text>Home</Text>
      {location && (
        <>
          <CurrentWeatherStats coordinates={location.coords} />
          <NextStudySession
            coordinates={location.coords}
            userPreferences={userPreferences}
          />
        </>
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

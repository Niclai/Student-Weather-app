import { FC, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import { UserPreferencesContext } from "../../providers/UserPreferences";
import CurrentDayForecast from "../Forecasts/CurrentDayForecast";
import Navbar from "../Navbar";
import NextStudySession from "../Scheduling/NextStudySession";
import CurrentWeatherStats from "../Weather/CurrentWeatherStats";

/**
 * Main screen component that is to be displayed upon startup of the application
 * and contain the most important features of the application so that they
 * can be accessed quickly and easily.
 */
const MainScreen: FC = () => {
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
          <CurrentDayForecast coordinates={location.coords} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default MainScreen;

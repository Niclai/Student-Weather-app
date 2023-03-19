import { FC, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { UserPreferencesContext } from "../../providers/UserPreferences";
import Navbar from "../Navbar";
import CurrentWeatherStats from "../Weather/CurrentWeatherStats";

const MainScreen: FC = () => {
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default MainScreen;

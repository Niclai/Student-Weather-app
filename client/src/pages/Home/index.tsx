import React, { useContext } from "react";
import { Text } from "react-native";

import { StyleSheet } from "react-native";

// Components
import FirstTimeSetup from "../../components/Home/FirstTimeSetup";
import MainScreen from "../../components/Home/MainScreen";
import Navbar from "../../components/Navbar";

// Context
import { UserPreferencesContext } from "../../providers/UserPreferences";

/**
 * Home page component. The first time the user launches the application,
 * it renders the FirstTimeSetup component. Once the initial setup the complete
 * by the user, the MainScreen is rendered.
 */
const Home = () => {
  const { userPreferences } = useContext(UserPreferencesContext);

  // return (
  //   <>
  //     <Navbar type={1} />
  //     <View style={styles.wrapper}>
  //       {/* {userPreferences && (
  //         <Text>
  //           Max wind speed preference: {userPreferences?.maxWindSpeed}
  //         </Text>
  //       )} */}
  //       {location && (
  //         <CurrentWeatherStats
  //           locationName={location.name}
  //           coordinates={location.coords}
  //         />
  //       )}
  //     </View>
  //   </>)

  return userPreferences === undefined ? (
    <Text>Loading application...</Text>
  ) : userPreferences === null ? (
    <FirstTimeSetup />
  ) : (
    <MainScreen />
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
  },
});

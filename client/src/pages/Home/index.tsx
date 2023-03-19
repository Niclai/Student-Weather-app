import React, { useContext } from "react";
import { Text } from "react-native";
import FirstTimeSetup from "../../components/Home/FirstTimeSetup";
import MainScreen from "../../components/Home/MainScreen";

// Context
import { UserPreferencesContext } from "../../providers/UserPreferences";

const Home = () => {
  const { userPreferences } = useContext(UserPreferencesContext);

  return userPreferences === undefined ? (
    <Text>Loading application...</Text>
  ) : userPreferences === null ? (
    <FirstTimeSetup />
  ) : (
    <MainScreen />
  );
};

export default Home;

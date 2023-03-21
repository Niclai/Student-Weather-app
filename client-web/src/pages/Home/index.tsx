import React, { useContext } from "react";

// Components
import FirstTimeSetup from "../../components/Home/FirstTimeSetup";
import MainScreen from "../../components/Home/MainScreen";

// Context
import { UserPreferencesContext } from "../../providers/UserPreferences";

/**
 * Home page component. The first time the user launches the application,
 * it renders the FirstTimeSetup component. Once the initial setup the complete
 * by the user, the MainScreen is rendered.
 */
const Home = () => {
  const { userPreferences } = useContext(UserPreferencesContext);

  return userPreferences === undefined ? (
    <p>Loading application...</p>
  ) : userPreferences === null ? (
    <FirstTimeSetup />
  ) : (
    <MainScreen />
  );
};

export default Home;

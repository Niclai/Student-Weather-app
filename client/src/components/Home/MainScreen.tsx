import { FC, useContext } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import { UserPreferencesContext } from "../../providers/UserPreferences";
import { getCurrentDateInFormat } from "../../utils/getCurrentDateInFormat";
import Navbar from "../Navbar";
import Tabs from "../Tabs";
import CurrentWeatherStats from "../Weather/CurrentWeatherStats";

import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;

/**
 * Main screen component that is to be displayed upon startup of the application
 * and contain the most important features of the application so that they
 * can be accessed quickly and easily.
 */
const MainScreen: FC = () => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const location = userPreferences?.location;
  return (
    <View style={styles.con}>
      <Navbar type={1} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          {location?.name &&
            location?.name.split(" ").map((txt: string, index: number) => (
              <Text key={index} style={styles.location}>
                {txt}
              </Text>
            ))}

          <Text style={styles.date}>{getCurrentDateInFormat()}</Text>

          {location && (
            <>
              <CurrentWeatherStats coordinates={location.coords} />
              <Tabs />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: "#189EDE",
  },
  wrapper: {
    backgroundColor: "#189EDE",
    width: "100%",
    paddingTop: 12,
    paddingHorizontal: 16,
    flex: 1,
    minHeight: windowHeight - 90,
  },
  location: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  date: {
    fontSize: 20,
    color: "#fff",
  },
});

export default MainScreen;

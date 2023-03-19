import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Components
import Navbar from "../../components/Navbar";

// Types
import { MainStackParamList } from "../../types/navigationParams";
import { UserPreferencesContext } from "../../components/savePreferences";

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { userPreferences, updateUserPreferences } = useContext(
    UserPreferencesContext
  );
  useEffect(
    () =>
      updateUserPreferences({
        hayFever: false,
        timesPerWeek: 1,
        maxWindSpeed: 5,
        preferredMinTemp: 0,
        preferredMaxTemp: 50,
        timeBeforeNotif: 1,
        pollenLevels: 100,
      }),
    []
  );
  return (
    <View style={styles.wrapper}>
      <Navbar />
      <Text>Home</Text>
      <Text>{userPreferences?.maxWindSpeed}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

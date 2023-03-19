import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserPreferenceForm from "../../components/Preferences/UserPreferenceForm";
import Navbar from "../../components/Navbar";

const Settings = () => {
  return (
    <View style={styles.wrapper}>
      <Navbar type={2} />
      <UserPreferenceForm />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

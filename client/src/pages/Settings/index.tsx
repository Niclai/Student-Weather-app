import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserPreferenceForm from "../../components/Preferences/UserPreferenceForm";

/**
 * Settings page for configuring user preferences
 */
const Settings = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Settings</Text>
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

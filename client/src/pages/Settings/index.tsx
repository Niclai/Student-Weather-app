import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { UserPreferences } from '../../types/userPreferences';

const Settings = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Settings</Text>
      <Text>Your current preferences:</Text>
      <Text>Hay </Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  
});

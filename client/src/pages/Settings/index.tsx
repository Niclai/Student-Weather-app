import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import UserPreferenceForm from '../../components/userPreferenceForm'; 

const Settings = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Settings</Text>
      <UserPreferenceForm/>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

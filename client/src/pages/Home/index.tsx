import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Types
import { MainStackParamList } from '../../types/navigationParams';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  return (
    <View style={styles.wrapper}>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        style={{ marginTop: '10%', backgroundColor: 'gray' }}>
        <Text style={{ fontSize: 20 }}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

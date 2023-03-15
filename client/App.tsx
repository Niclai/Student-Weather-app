import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainRouter from './src/navigation/MainRouter';
import { UserPreferenceProvider } from './src/components/savePreferences';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <UserPreferenceProvider>
          <MainRouter />
        </UserPreferenceProvider>
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

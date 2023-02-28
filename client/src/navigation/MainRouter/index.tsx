import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Components
import Home from '../../pages/Home';
import Settings from '../../pages/Settings';

// Types
import { MainStackParamList } from '../../types/navigationParams';

// MainStack
const MainStack = createStackNavigator<MainStackParamList>();

const MainRouter = () => {
  return (
    <View style={{ flex: 1 }}>
      <MainStack.Navigator
        screenOptions={{
          // Horizontal animation
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // Turn off default header
          headerShown: false,
        }}>
        {/* All Screens */}
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Settings" component={Settings} />
      </MainStack.Navigator>
    </View>
  );
};

export default MainRouter;

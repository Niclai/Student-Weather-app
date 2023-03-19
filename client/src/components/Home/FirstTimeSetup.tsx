import { FC } from "react";
import { View, Text } from "react-native";
import UserPreferenceForm from "../Preferences/UserPreferenceForm";

/**
 * Component to be displayed for the user to perform the initial configuration
 * to allow the weather forecasting and scheduling functionality to work
 * correctly
 */
const FirstTimeSetup: FC = () => {
  return (
    <View>
      <Text>
        Welcome! Complete the startup configuration so we can tailor the
        application to your needs
      </Text>
      <UserPreferenceForm />
    </View>
  );
};

export default FirstTimeSetup;

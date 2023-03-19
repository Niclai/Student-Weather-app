import { FC } from "react";
import { View, Text } from "react-native";
import UserPreferenceForm from "../Preferences/UserPreferenceForm";

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

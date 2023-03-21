import { FC, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import UserPreferenceForm from "../Preferences/UserPreferenceForm";

/**
 * Component to be displayed for the user to perform the initial configuration
 * to allow the weather forecasting and scheduling functionality to work
 * correctly
 */
const FirstTimeSetup: FC = () => {
  const [state, setState] = useState(0);

  return (
    <View style={styles.wrapper}>
      {state === 0 ? (
        <View style={styles.introCon}>
          <Text style={styles.introTxt}>
            Welcome! Complete the startup configuration so we can tailor the
            application to your needs
          </Text>
          <Button onPress={() => setState(1)} title="Continue" />
        </View>
      ) : (
        <UserPreferenceForm />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  introCon: {
    paddingVertical: 20,
    maxWidth: "75%",
  },
  introTxt: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
});

export default FirstTimeSetup;

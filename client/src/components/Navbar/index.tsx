import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MainStackParamList } from "../../types/navigationParams";

const Navbar = () => {
  const navigator = useNavigation<StackNavigationProp<MainStackParamList>>();
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigator.navigate("Settings")}
      >
        <Text>Icon for settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log("Navigating to notifications")}
      >
        <Text>Icon for notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  wrapper: {
    height: 90,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 20,
  },
});

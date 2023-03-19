import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MainStackParamList } from "../../types/navigationParams";

enum NavbarStyle {
  "Default" = 1,
  "Settings" = 2,
}

interface NavbarProps {
  type: NavbarStyle;
}

const Navbar: FC<NavbarProps> = ({ type }) => {
  const navigator = useNavigation<StackNavigationProp<MainStackParamList>>();
  return (
    <View style={styles.wrapper}>
      {type === NavbarStyle.Default ? (
        <View style={styles.mainContent}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigator.navigate("Settings")}
          >
            <Image
              style={styles.img}
              source={require("../../../assets/icons/settings.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log("Navigating to notifications")}
          >
            <Image
              style={styles.img}
              source={require("../../../assets/icons/notif.png")}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.secondaryContent}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigator.goBack()}
          >
            <Image
              style={styles.img}
              source={require("../../../assets/icons/arrback.png")}
            />
          </TouchableOpacity>
          <Text style={styles.label}>Settings</Text>
        </View>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#007DB8",
    height: 90,
    paddingTop: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  mainContent: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  secondaryContent: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 12,
  },
  img: {
    height: 24,
    width: 24,
  },
});

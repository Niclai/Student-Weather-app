import { FC, ReactNode } from "react";
import { Linking, StyleSheet, Text } from "react-native";

interface LinkProps {
  children: ReactNode;
  href: string;
}

const Link: FC<LinkProps> = ({ children, href }) => {
  return (
    <Text
      onPress={() => {
        Linking.openURL(href);
      }}
      style={styles.link}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#1a0dab",
    textDecorationLine: "underline",
  },
});

export default Link;

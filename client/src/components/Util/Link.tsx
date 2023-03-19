import { FC, ReactNode } from "react";
import { Linking, StyleSheet, Text } from "react-native";

interface LinkProps {
  children: ReactNode;
  href: string;
}

/**
 * A basic link imitating that found on web pages. Opens the browser with the
 * given href url upon pressing.
 */
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

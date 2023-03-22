import { FC, ReactNode } from "react";

import "./Link.css";

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
    <a
      href={href}
      style={styles.link}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};

const styles = {
  link: {
    color: "#1a0dab",
    textDecorationLine: "underline",
  },
};

export default Link;

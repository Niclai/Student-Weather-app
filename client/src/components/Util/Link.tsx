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
    <a href={href} target="_blank" rel="noreferrer noopener" className="link">
      {children}
    </a>
  );
};

export default Link;

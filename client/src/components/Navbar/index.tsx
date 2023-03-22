import { FC } from "react";
import { Link } from "react-router-dom";

import SettingsIcon from "../../assets/icons/settings.png";
import ArrowIcon from "../../assets/icons/arrback.png";

import styles from "./Navbar.module.scss";

enum NavbarStyle {
  "Default" = 1,
  "Settings" = 2,
}

interface NavbarProps {
  type: NavbarStyle;
}

/**
 * The navbar component is a reusable UI component that provides
 * navigation functionality and can be rendered on multiple pages
 * in a web application.
 */
const Navbar: FC<NavbarProps> = ({ type }) => {
  return (
    <nav className={styles.navbar}>
      {type === NavbarStyle.Default ? (
        <div className={styles.mainContent}>
          <Link to="/settings">
            <img className={styles.img} src={SettingsIcon} />
          </Link>
        </div>
      ) : (
        <div className={styles.secondaryContent}>
          <Link to="/">
            <img className={styles.img} src={ArrowIcon} />
          </Link>
          <p className={styles.label}>Settings</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

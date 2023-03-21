import { FC } from "react";
import { Link } from "react-router-dom";

import SettingsIcon from "../../assets/icons/settings.png";
import ArrowIcon from "../../assets/icons/arrback.png";

import "./navbar.css";

enum NavbarStyle {
  "Default" = 1,
  "Settings" = 2,
}

interface NavbarProps {
  type: NavbarStyle;
}

const Navbar: FC<NavbarProps> = ({ type }) => {
  return (
    <nav className="wrapper">
      {type === NavbarStyle.Default ? (
        <div className="mainContent">
          <Link to="/settings">
            <img className="img" src={SettingsIcon} />
          </Link>
        </div>
      ) : (
        <div className="secondaryContent">
          <Link to="/">
            <img className="img" src={ArrowIcon} />
          </Link>
          <p className="label">Settings</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

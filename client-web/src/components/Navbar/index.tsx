import { FC } from "react";
import { Link } from "react-router-dom";

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
            <img
              className="img"
              src={require("../../../assets/icons/settings.png")}
            />
          </Link>
        </div>
      ) : (
        <div className="secondaryContent">
          <Link to="/">
            <img
              className="img"
              src={require("../../../assets/icons/arrback.png")}
            />
          </Link>
          <p className="label">Settings</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

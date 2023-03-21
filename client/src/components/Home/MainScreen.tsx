import { FC, useContext } from "react";

import { UserPreferencesContext } from "../../providers/UserPreferences";
import { getCurrentDateInFormat } from "../../utils/getCurrentDateInFormat";
import Navbar from "../Navbar";
import Tabs from "../Tabs";
import CurrentWeatherStats from "../Weather/CurrentWeatherStats";

import "./MainScreen.css";

/**
 * Main screen component that is to be displayed upon startup of the application
 * and contain the most important features of the application so that they
 * can be accessed quickly and easily.
 */
const MainScreen: FC = () => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const location = userPreferences?.location;
  return (
    <div className="con">
      <Navbar type={1} />
      <div style={{ flex: 1 }}>
        <div className="wrapper">
          {location?.name &&
            location?.name.split(" ").map((txt: string, index: number) => (
              <p key={index} className="location">
                {txt}
              </p>
            ))}

          <p className="date">{getCurrentDateInFormat()}</p>

          {location && (
            <>
              <CurrentWeatherStats coordinates={location.coords} />
              <Tabs />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;

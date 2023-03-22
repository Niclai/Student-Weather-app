import { FC, useContext } from "react";

import { UserPreferencesContext } from "../../providers/UserPreferences";
import { getCurrentDateInFormat } from "../../utils/getCurrentDateInFormat";
import Navbar from "../Navbar";
import Tabs from "../Tabs";
import CurrentWeatherStats from "../Weather/CurrentWeatherStats";
import A from "../Util/Link";

// import "./MainScreen.scss";
import styles from "./MainScreen.module.scss";

/**
 * Main screen component that is to be displayed upon startup of the application
 * and contain the most important features of the application so that they
 * can be accessed quickly and easily.
 */
const MainScreen: FC = () => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const location = userPreferences?.location;
  return (
    <div className={styles.mainScreen}>
      <Navbar type={1} />
      <div style={{ flex: 1 }}>
        <div className={styles.wrapper}>
          <p className={styles.location}>{location?.name}</p>

          <p className={styles.date}>{getCurrentDateInFormat()}</p>

          {location && (
            <>
              <CurrentWeatherStats coordinates={location.coords} />
              <Tabs />
            </>
          )}
          <p>
            <A href="https://www.figma.com/community/file/1102960831369614781">
              Weather Icons created by Roman Davydko
            </A>
            , licensed under&nbsp;
            <A href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</A>
          </p>
          <p>
            <A href="https://open-meteo.com/">Weather data by Open-Meteo.com</A>
            , licensed under&nbsp;
            <A href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</A>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;

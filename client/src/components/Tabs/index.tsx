import React, { useContext } from "react";
import NextStudySession from "../Scheduling/NextStudySession";
import CurrentDayForecast from "../Forecasts/CurrentDayForecast";
import { UserPreferencesContext } from "../../providers/UserPreferences";

import styles from "./Tabs.module.scss";

interface TabProps {
  isActive: boolean;
  txt: string;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ isActive, txt, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={isActive ? styles.tabActiveItem : styles.tabItem}
    >
      <p className={isActive ? styles.tabActiveTxt : styles.tabTxt}>{txt}</p>
    </button>
  );
};

const tabs = ["Forecast", "Sessions"];

const Tabs = () => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className={styles.card}>
      {/* Tabs */}
      <div className={styles.tabCon}>
        {tabs.map((tab: string, index: number) => (
          <Tab
            onClick={() => setActiveTab(index)}
            key={index}
            isActive={activeTab === index}
            txt={tab}
          />
        ))}
      </div>

      {/* Body */}
      {userPreferences && userPreferences.location && (
        <>
          {activeTab === 0 ? (
            <CurrentDayForecast coordinates={userPreferences.location.coords} />
          ) : (
            <NextStudySession
              coordinates={userPreferences.location.coords}
              userPreferences={userPreferences}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Tabs;

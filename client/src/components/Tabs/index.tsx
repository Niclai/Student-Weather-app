import React, { useContext } from "react";
import NextStudySession from "../Scheduling/NextStudySession";
import CurrentDayForecast from "../Forecasts/CurrentDayForecast";
import { UserPreferencesContext } from "../../providers/UserPreferences";

import "./tabs.css";

interface TabProps {
  isActive: boolean;
  txt: string;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ isActive, txt, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={isActive ? "tabActiveItem" : "tabItem"}
    >
      <p className={isActive ? "tabActiveTxt" : "tabTxt"}>{txt}</p>
    </button>
  );
};

const tabs = ["Forecast", "Sessions"];

const Tabs = () => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className="card">
      {/* Tabs */}
      <div className="tabCon">
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

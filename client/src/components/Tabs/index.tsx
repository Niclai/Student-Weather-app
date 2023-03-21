import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import NextStudySession from "../Scheduling/NextStudySession";
import CurrentDayForecast from "../Forecasts/CurrentDayForecast";
import { UserPreferencesContext } from "../../providers/UserPreferences";

interface TabProps {
  isActive: boolean;
  txt: string;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ isActive, txt, onClick }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={isActive ? styles.tabActiveItem : styles.tabItem}
    >
      <Text style={isActive ? styles.tabActiveTxt : styles.tabTxt}>{txt}</Text>
    </TouchableOpacity>
  );
};

const tabs = ["Forecast", "Sessions"];

const Tabs = () => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <View style={styles.card}>
      {/* Tabs */}
      <View style={styles.tabCon}>
        {tabs.map((tab: string, index: number) => (
          <Tab
            onClick={() => setActiveTab(index)}
            key={index}
            isActive={activeTab === index}
            txt={tab}
          />
        ))}
      </View>

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
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    backgroundColor: "#65b6dc",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 20,
  },
  tabCon: {
    width: "100%",
    padding: 4,
    borderColor: "#189EDE",
    borderWidth: 3,
    borderRadius: 12,
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginHorizontal: 2,
  },
  tabActiveItem: {
    flex: 1,
    backgroundColor: "#189EDE",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginHorizontal: 2,
  },
  tabActiveTxt: {
    color: "#fff",
    fontSize: 16,
  },
  tabTxt: {
    color: "#000",
    fontSize: 16,
  },
});

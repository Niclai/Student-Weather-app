import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { Text, StyleSheet } from "react-native";
import { getWeeklyDaylightHours } from "../../api/daylight";

import { getWeekForecast } from "../../api/forecast";
import { isSessionValid, scheduleWeek } from "../../domain/scheduling";
import { DaylightHours } from "../../types/daylightHours";
import { Forecast } from "../../types/forecast";
import { Coordinates } from "../../types/location";
import { UserPreferences } from "../../types/userPreferences";
import { getDateAndTimeInFormat } from "../../utils/getCurrentDateInFormat";

interface NextStudySessionProps {
  coordinates: Coordinates;
  userPreferences: UserPreferences;
}

const hourInMilliseconds = 60 * 60 * 1000;

/**
 * Component to display when the next study session is currently scheduled for,
 * automatically updating as needed.
 */
const NextStudySession: FC<NextStudySessionProps> = ({
  coordinates,
  userPreferences,
}) => {
  const [scheduling, setScheduling] = useState<Date[]>();

  const updateSchedule = (
    forecasts: Forecast[][],
    daylightHours: DaylightHours[]
  ) => {
    setScheduling(
      scheduleWeek(
        forecasts.map((f, i) => ({
          forecasts: f,
          daylightHours: daylightHours[i],
        })),
        userPreferences
      )
    );
  };

  // Update schedule whenever coordinates or preferences change
  useEffect(() => {
    Promise.all([
      getWeekForecast(coordinates),
      getWeeklyDaylightHours(coordinates),
    ]).then(promise => updateSchedule(...promise));
  }, [coordinates, userPreferences]);

  // Verify schedule every hour and update entire schedule if any session
  // becomes invalid
  useEffect(() => {
    const interval = setInterval(() => {
      Promise.all([
        getWeekForecast(coordinates),
        getWeeklyDaylightHours(coordinates),
      ]).then(([forecasts, daylightHours]) => {
        const flatForecasts = forecasts.flat();
        if (
          scheduling?.some(
            session => !isSessionValid(session, flatForecasts, userPreferences)
          )
        ) {
          updateSchedule(forecasts, daylightHours);
        }
      });
    }, hourInMilliseconds);
    return () => {
      clearInterval(interval);
    };
  }, [coordinates, userPreferences]);

  return (
    <View style={styles.wrapper}>
      {scheduling == null ? (
        <Text style={styles.txt}>Scheduling study sessions...</Text>
      ) : scheduling.length == 0 ? (
        <Text style={styles.txt}>
          No study sessions scheduled for the upcoming week
        </Text>
      ) : (
        <>
          <Text style={styles.txt}>Next study session scheduled for</Text>
          <Text style={styles.time}>
            {getDateAndTimeInFormat(scheduling[0])}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 180,
    alignItems: "center",
  },
  txt: {
    marginTop: 20,

    fontSize: 18,
    textAlign: "center",
  },
  time: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NextStudySession;

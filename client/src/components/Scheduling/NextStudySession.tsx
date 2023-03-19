import { FC, useEffect, useState } from "react";
import { Text } from "react-native";
import { getWeeklyDaylightHours } from "../../api/daylight";

import { getWeekForecast } from "../../api/forecast";
import { isSessionValid, scheduleWeek } from "../../domain/scheduling";
import { DaylightHours } from "../../types/daylightHours";
import { Forecast } from "../../types/forecast";
import { Coordinates } from "../../types/location";
import { UserPreferences } from "../../types/userPreferences";

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

  return scheduling == null ? (
    <Text>Scheduling study sessions...</Text>
  ) : scheduling.length == 0 ? (
    <Text>No study sessions scheduled for the upcoming week</Text>
  ) : (
    <Text>Next study session scheduled for {scheduling[0].toISOString()}</Text>
  );
};

export default NextStudySession;

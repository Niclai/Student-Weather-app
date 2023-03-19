import { FC, useEffect, useState } from "react";
import { Text } from "react-native";

import { getWeekForecast } from "../../api/forecast";
import { scheduleWeek } from "../../domain/scheduling";
import { Forecast } from "../../types/forecast";
import { Coordinates } from "../../types/location";
import { UserPreferences } from "../../types/userPreferences";

interface NextStudySessionProps {
  coordinates: Coordinates;
  userPreferences: UserPreferences;
}

const NextStudySession: FC<NextStudySessionProps> = ({
  coordinates,
  userPreferences,
}) => {
  const [forecast, setForecast] = useState<Forecast[][]>();
  const scheduling =
    forecast != null
      ? scheduleWeek(
          forecast.map(f => ({
            forecasts: f,
            daylightHours: {
              // TODO use actual sunrise and sunset hours one #48 is done
              sunrise: new Date(f[0].time),
              sunset: new Date(f[23].time),
            },
          })),
          userPreferences
        )
      : null;

  useEffect(() => {
    getWeekForecast(coordinates).then(f => setForecast(f));
  }, [coordinates]);

  return scheduling == null ? (
    <Text>Scheduling study sessions...</Text>
  ) : scheduling.length == 0 ? (
    <Text>No study sessions scheduled for the upcoming week</Text>
  ) : (
    <Text>Next study session scheduled for {scheduling[0].toISOString()}</Text>
  );
};

export default NextStudySession;

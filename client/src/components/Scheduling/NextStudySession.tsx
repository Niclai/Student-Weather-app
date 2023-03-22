import { FC, useEffect, useState } from "react";
import { getWeeklyDaylightHours } from "../../api/daylight";

import { getWeekForecast } from "../../api/forecast";
import { isSessionValid, scheduleWeek } from "../../domain/scheduling";
import { DaylightHours } from "../../types/daylightHours";
import { Forecast } from "../../types/forecast";
import { Coordinates } from "../../types/location";
import { UserPreferences } from "../../types/userPreferences";
import { getDateAndTimeInFormat } from "../../utils/getCurrentDateInFormat";

import "./NextStudySession.scss";

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
    <div className="next-study-session">
      {scheduling == null ? (
        <p className="txt">Scheduling study sessions...</p>
      ) : scheduling.length == 0 ? (
        <p className="txt">No study sessions scheduled for the upcoming week</p>
      ) : (
        <>
          <p className="txt">Next study session scheduled for&nbsp;</p>
          <p className="time">{getDateAndTimeInFormat(scheduling[0])}</p>
        </>
      )}
    </div>
  );
};

export default NextStudySession;

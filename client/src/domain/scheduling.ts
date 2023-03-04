import { DaylightHours } from "../types/daylightHours";
import { Forecast } from "../types/forecast";
import { UserPreferences } from "../types/userPreferences";

/**
 * Basic weekly study session scheduling algorithm. Finds the candidate study
 * sessions for each day of the week based on the forecasts and user
 * preferences. From the candidate sessions, scheduled sessions will be chosen
 * at random to satisfy the number of times per week the user wants to study.
 *
 * A possible future improvement to this algorithm would be to try to uniformly
 * distribute the selected study session from the candidates.
 *
 * @returns the scheduled times for starting a study session
 */
const scheduleWeek = (
  weekForecasts: { daylightHours: DaylightHours; forecasts: Forecast[] }[],
  userPreferences: UserPreferences
): Date[] => {
  // TODO
  // return [];
};

/**
 * Basic scheduling algorithm to find candidate study sessions for a given day.
 * Only takes into consideration daylight hours and keeps those hours which are
 * forecasted to meet the user's weather preferences for the specified study
 * session duration.
 *
 * @returns the candidate times for starting a study session
 */
const scheduleDay = (
  daylightHours: DaylightHours,
  forecasts: Forecast[],
  userPreferences: UserPreferences
): Date[] => {
  // TODO
  return [];
};

export { scheduleWeek };

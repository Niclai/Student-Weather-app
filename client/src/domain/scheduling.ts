import { DaylightHours } from "../types/daylightHours";
import { Forecast } from "../types/forecast";
import { UserPreferences } from "../types/userPreferences";
import { combinePredicates } from "../utils/higherOrderFunctions";
import { chooseRandom } from "../utils/randomNumberGenerators";

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
  if (weekForecasts.length != 7) {
    throw new Error(
      `expected 7 entries in weekForecasts array, but got ${weekForecasts.length}`
    );
  }

  const candidates = weekForecasts.flatMap(day =>
    scheduleDay(day.daylightHours, day.forecasts, userPreferences)
  );

  return chooseRandom(candidates, userPreferences.timesPerWeek);
};

const getWeatherFilters = (
  userPreferences: UserPreferences
): ((forecast: Forecast) => boolean) => {
  const temperatureFilter = (forecast: Forecast): boolean =>
    forecast.temperature >= userPreferences.preferredMinTemp &&
    forecast.temperature <= userPreferences.preferredMaxTemp;

  const windFilter = (forecast: Forecast): boolean =>
    forecast.windSpeed <= userPreferences.maxWindSpeed;

  const precipitationFilter = (forecast: Forecast): boolean =>
    forecast.precipitationProbability === 0;

  return combinePredicates([
    temperatureFilter,
    windFilter,
    precipitationFilter,
  ]);
};

const isSessionValid = (
  forecasts: Forecast[],
  session: Date,
  userPreferences: UserPreferences
) => {
  const forecast = forecasts.find(f => f.time === session);
  return forecast != null && getWeatherFilters(userPreferences)(forecast);
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
  dayForecasts: Forecast[],
  userPreferences: UserPreferences
): Date[] => {
  // precondition check
  if (dayForecasts.length != 24) {
    throw new Error(
      `expected 24 entries in forecast array, but got ${dayForecasts.length}`
    );
  }

  // filter predicate definitions

  const daylightFilter = (forecast: Forecast): boolean => {
    const sessionOffset = new Date(forecast.time);
    sessionOffset.setHours(
      sessionOffset.getHours() + userPreferences.sessionDuration
    );

    return (
      forecast.time >= daylightHours.sunrise &&
      sessionOffset <= daylightHours.sunset
    );
  };

  const weatherFilters = getWeatherFilters(userPreferences);

  // scheduling logic

  const candidates = dayForecasts.filter(weatherFilters);

  const candidateIndices: number[] = dayForecasts.reduce(
    (indices, forecast, i) =>
      candidates.includes(forecast) ? indices.concat([i]) : indices,
    new Array<number>()
  );

  const candidateStartIndices = candidateIndices.filter(index => {
    for (let i = index + 1; i <= index + userPreferences.sessionDuration; i++) {
      if (!candidateIndices.includes(i)) return false;
    }
    return true;
  });

  return dayForecasts
    .filter((_, i) => candidateStartIndices.includes(i))
    .filter(daylightFilter)
    .map(forecast => forecast.time);
};

export { scheduleWeek, scheduleDay };

import { Forecast } from "../types/forecast";
import { Coordinates } from "../types/location";

/**
 * Our API of choice for pulling weather forecasts
 */
const baseUrl = "https://api.open-meteo.com";
const hoursPerDay = 24;
const daysPerWeek = 7;

interface OpenMeteoForecastResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    windspeed_10m: number[];
    precipitation_probability: number[];
  };
}

/**
 * Get weather forecasts from the Open-Meteo API.
 * @param nDays number of days to fetch forecasts for. Value must be between 1
 * and 16 (inclusive).
 * @param coordinates of the location to fetch forecasts for.
 * @returns an array of hourly forecasts (24 for each day)
 */
const getNDaysForecast = async (
  nDays: number,
  coordinates: Coordinates
): Promise<Forecast[]> => {
  const response = await fetch(
    `${baseUrl}/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}` +
      `&hourly=temperature_2m,windspeed_10m,precipitation_probability` +
      `&forecast_days=${nDays}`
  );
  const json: OpenMeteoForecastResponse = await response.json();
  const { hourly } = json;

  const forecasts: Forecast[] = Array(hoursPerDay);

  for (let i = 0; i < hoursPerDay * nDays; i++) {
    forecasts[i] = {
      time: new Date(hourly.time[i]),
      temperature: hourly.temperature_2m[i],
      windSpeed: hourly.windspeed_10m[i],
      precipitationProbability: hourly.precipitation_probability[i],
    };
  }

  return forecasts;
};

/**
 * Get weather forecasts for the current day.
 * @param coordinates of the location to fetch forecasts for.
 * @returns an array of 24 Forecasts, one for each full hour of the day ranging
 * from 00:00 to 23:00
 */
const getDayForecast = async (
  coordinates: Coordinates
): Promise<Forecast[]> => {
  return getNDaysForecast(1, coordinates);
};

/**
 * Get weather forecasts for 7 days, starting from the current day.
 * @param coordinates of the location to fetch forecasts for.
 * @returns an array of 7 arrays, each corresponding to a single day and
 * containing 24 Forecasts, one for each full hour of the day ranging from 00:00
 * to 23:00
 */
const getWeekForecast = async (
  coordinates: Coordinates
): Promise<Forecast[][]> => {
  const allForecasts = await getNDaysForecast(daysPerWeek, coordinates);
  const forecastsByDay: Forecast[][] = [...Array(daysPerWeek)].map(() =>
    Array(hoursPerDay)
  );

  for (let i = 0; i < hoursPerDay * daysPerWeek; i++) {
    const day = Math.floor(i / hoursPerDay);
    const hour = i % hoursPerDay;
    forecastsByDay[day][hour] = allForecasts[i];
  }

  return forecastsByDay;
};

export { getDayForecast, getWeekForecast };

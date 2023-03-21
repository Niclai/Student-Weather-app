import { DaylightHours } from "../types/daylightHours";
import { Coordinates } from "../types/location";

/**
 * Our API of choice for pulling daylight hours
 */
const baseUrl = "https://api.open-meteo.com";

interface OpenMeteoDaylightResponse {
  daily: {
    time: string[];
    sunrise: number[];
    sunset: number[];
  };
}

/**
 * Get the sunrise and sunset times for the given location
 * @param coordinates of location
 * @param nDays to retrieve times for, must be between 1 and 16
 * @returns an array of DaylightHours corresponding to each requested day
 */
const getNDaysDaylightHours = async (
  coordinates: Coordinates,
  nDays: number
): Promise<DaylightHours[]> => {
  const response = await fetch(
    `${baseUrl}/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}` +
      `&daily=sunrise,sunset` +
      `&timezone=GMT` +
      `&forecast_days=${nDays}`
  );
  const json: OpenMeteoDaylightResponse = await response.json();
  const { daily } = json;

  const daylightHours: DaylightHours[] = Array(nDays);

  for (let i = 0; i < nDays; i++) {
    daylightHours[i] = {
      sunrise: new Date(daily.sunrise[i]),
      sunset: new Date(daily.sunset[i]),
    };
  }

  return daylightHours;
};

/**
 * Get the sunrise and sunset times for the current day in the given location
 * @param coordinates of location
 */
const getDaylightHours = async (
  coordinates: Coordinates
): Promise<DaylightHours> => (await getNDaysDaylightHours(coordinates, 1))[0];

/**
 * Get the sunrise and sunset times for 7 days starting from today in the
 * given location
 * @param coordinates of location
 */
const getWeeklyDaylightHours = (
  coordinates: Coordinates
): Promise<DaylightHours[]> => getNDaysDaylightHours(coordinates, 7);

export { getDaylightHours, getWeeklyDaylightHours };

import { Coordinates } from "../types/location";
import { Weather, WeatherConditions } from "../types/weather";

/**
 * Stubbed implementation
 * TODO complete in #38
 */
const getCurrentWeather = (_: Coordinates): Weather => ({
  temperature: 13.2,
  windSpeed: 5,
  conditions: WeatherConditions.ClearSky,
});

export { getCurrentWeather };

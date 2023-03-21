/**
 * Individual unit of weather forecast for a given hour
 */
export interface Forecast {
  time: Date;
  temperature: number;
  windSpeed: number;
  precipitationProbability: number;
}

import { Location } from "./location";

export interface UserPreferences {
  /**
   * Location for weather information and forecasts
   */
  location: Location | undefined;

  /**
   * where user has hay fever or not
   */
  hayFever: boolean;

  /**
   * how many times a week to be notified (1-7)
   */
  timesPerWeek: number;

  /**
   * how long before study space to be notified (hours)
   */
  timeBeforeNotif: number;

  /**
   * units: hours
   */
  sessionDuration: number;

  /**
   * units: degrees celsius
   */
  preferredMinTemp: number;

  /**
   * units: degrees celsius
   */
  preferredMaxTemp: number;

  /**
   * units: km/h
   */
  maxWindSpeed: number;

  /**
   * units: pollen count (grains per volume of air)
   * only needed if hayFever is true
   */
  maxPollenLevels: number;
}

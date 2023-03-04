export interface UserPreferences {
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
  studyDuration: number;
  /**
   * units: degrees celcius
   */
  preferredMinTemp: number;
  preferredMaxTemp: number;
  /**
   * default=5 (km/h)
   */
  maxWindSpeed: number;
  /**
   * units: pollen count (grains per volume of air)
   * only needed if hayFever=True
   */
  pollenLevels: number;
  }
  
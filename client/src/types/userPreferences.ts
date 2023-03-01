export interface UserPreferences {
  hayFever: boolean;
  timesPerWeek: number;
  /**
   * how many times a week to be notified (1-7)
   */
  timeBeforeNotif: number;
  /**
   * how long before study space to be notified (hours)
   */
  studyDuration: number;
  /**
   * units: hours
   */
  preferredMinTemp: number;
  preferredMaxTemp: number;
  /**
   * units: degrees celcius
   */
  maxWindSpeed: 5;
  /**
   * default=5 (km/h)
   */
  pollenLevels: number;
  /**
   * units: pollen count (grains per volume of air)
   * only needed if hayFever=True
   */
  }

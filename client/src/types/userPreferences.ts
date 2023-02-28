/* Dawid Lachowicz and Kishan Kumaran Thanikasalam
28/02/2023
user preferences options
*/

export interface UserPreferences {
  hayFever: boolean;
  timesPerWeek: number; // how many times a week to be notified (1-7)
  timeBeforeNotif: number; // how long before study space to be notified (hrs)
  preferredMinTemp: number;
  preferredMaxTemp: number;
  maxWindSpeed: 5; // default=5 (km/h)
  pollenLevels: number; // units=pollen count (grains per volume of air); only needed if hayFever=True
}

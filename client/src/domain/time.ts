import { DaylightHours } from "../types/daylightHours";

const isDaytime = (daylightHours: DaylightHours): boolean => {
  const currentTime = new Date();
  return (
    currentTime >= daylightHours.sunrise && currentTime < daylightHours.sunset
  );
};

export { isDaytime };

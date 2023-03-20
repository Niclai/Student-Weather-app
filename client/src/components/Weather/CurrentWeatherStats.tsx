import { FC, useEffect, useState } from "react";
import { getDaylightHours } from "../../api/daylight";
import { getCurrentWeather } from "../../api/weather";
import { isDaytime } from "../../domain/time";
import { DaylightHours } from "../../types/daylightHours";
import { Coordinates } from "../../types/location";
import { Weather } from "../../types/weather";
import WeatherStats from "./WeatherStats";

interface CurrentWeatherStatsProps {
  locationName: string;
  coordinates: Coordinates;
}

const hourInMilliseconds = 60 * 60 * 1000;

/**
 * Component for displaying basic current weather stats based on the given
 * location.
 */
const CurrentWeatherStats: FC<CurrentWeatherStatsProps> = ({
  locationName,
  coordinates,
}) => {
  const [weather, setWeather] = useState<Weather>();
  const [daylightHours, setDaylightHours] = useState<DaylightHours>();

  useEffect(() => {
    getCurrentWeather(coordinates).then(w => setWeather(w));
    getDaylightHours(coordinates).then(d => setDaylightHours(d));
  }, [coordinates]);

  // update current weather every hour
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentWeather(coordinates).then(w => setWeather(w));

      // if the day changed, fetch new sunrise/sunset times
      if (new Date().getDate() != daylightHours?.sunrise?.getDate()) {
        getDaylightHours(coordinates).then(d => setDaylightHours(d));
      }
    }, hourInMilliseconds);
    return () => {
      clearInterval(interval);
    };
  }, [coordinates]);

  // TODO call getDaylightInfo function and check if it's daytime once #48 is
  // implemented

  return (
    <>
      {weather && daylightHours && (
        <WeatherStats
          locationName={locationName}
          isDay={isDaytime(daylightHours)}
          weather={weather}
        />
      )}
    </>
  );
};

export default CurrentWeatherStats;

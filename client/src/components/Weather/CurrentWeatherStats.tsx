import { FC, useEffect, useState } from "react";
import { getCurrentWeather } from "../../api/weather";
import { Coordinates } from "../../types/location";
import { Weather } from "../../types/weather";
import WeatherStats from "./WeatherStats";

interface CurrentWeatherStatsProps {
  coordinates: Coordinates;
}

const hourInMilliseconds = 60 * 60 * 1000;

/**
 * Component for displaying basic current weather stats based on the given
 * location.
 */
const CurrentWeatherStats: FC<CurrentWeatherStatsProps> = ({ coordinates }) => {
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    setWeather(getCurrentWeather(coordinates));
  }, [coordinates]);

  // update current weather every hour
  useEffect(() => {
    const interval = setInterval(
      () => setWeather(getCurrentWeather(coordinates)),
      hourInMilliseconds
    );
    return () => {
      clearInterval(interval);
    };
  }, [coordinates]);

  // TODO call getDaylightInfo function and check if it's daytime once #48 is
  // implemented
  return <>{weather && <WeatherStats isDay={true} weather={weather} />}</>;
};

export default CurrentWeatherStats;

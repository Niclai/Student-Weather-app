import { FC, useEffect, useState } from "react";
import { getWeekForecast } from "../../api/forecast";
import { getCurrentWeather } from "../../api/weather";
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
  const [forecast, setForecast] = useState<any>();

  useEffect(() => {
    getCurrentWeather(coordinates).then(w => setWeather(w));
    getWeekForecast(coordinates).then(res => console.log(res[0]));
  }, [coordinates]);

  // update current weather every hour
  useEffect(() => {
    const interval = setInterval(
      () => getCurrentWeather(coordinates).then(w => setWeather(w)),
      hourInMilliseconds
    );
    return () => {
      clearInterval(interval);
    };
  }, [coordinates]);

  // TODO call getDaylightInfo function and check if it's daytime once #48 is
  // implemented
  return (
    <>
      {weather && (
        <WeatherStats
          locationName={locationName}
          isDay={true}
          weather={weather}
        />
      )}
    </>
  );
};

export default CurrentWeatherStats;

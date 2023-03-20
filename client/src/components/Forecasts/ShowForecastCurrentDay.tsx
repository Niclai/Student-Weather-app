import { View, Text } from "react-native";
import { getDayForecast } from "../../api/forecast";
import { Coordinates } from "../../types/location";
import { Forecast } from "../../types/forecast";
import { FC, useEffect, useState } from "react";

interface ShowCurrentDayForecastProps {
  coordinates: Coordinates;
}

const hoursInMilliseconds = 60 * 60 * 1000;

const CurrentDayForecast: FC<ShowCurrentDayForecastProps> = ({
  coordinates,
}) => {
  const [currentForecast, setCurrentForecast] = useState<Forecast[]>();

  useEffect(() => {
    getDayForecast(coordinates).then(f => setCurrentForecast(f));
  }, [coordinates]);

  //update every hour
  useEffect(() => {
    const interval = setInterval(() => {
      getDayForecast(coordinates).then(f => setCurrentForecast(f));
    }, hoursInMilliseconds);

    return () => {
      clearInterval(interval);
    };
  }, [coordinates]);

  return (
    <View>
      <Text>Todays Forecast: </Text>
      {currentForecast?.map(forecast => (
        <Text key={forecast.time.toISOString()}>
          {forecast.temperature} {forecast.windSpeed}{" "}
          {forecast.time.toISOString()} {forecast.precipitationProbability}
        </Text>
      ))}
    </View>
  );
};

export default CurrentDayForecast;

import { getDayForecast } from "../../api/forecast";
import { Coordinates } from "../../types/location";
import { Forecast } from "../../types/forecast";
import { FC, useEffect, useState } from "react";

import "./CurrentDayForecast.scss";

interface CurrentDayForecastProps {
  coordinates: Coordinates;
}

const hoursInMilliseconds = 60 * 60 * 1000;

/**
 * Component for displaying an hour by hour breakdown of the weather forecast
 * for the current day
 */
const CurrentDayForecast: FC<CurrentDayForecastProps> = ({ coordinates }) => {
  const [currentForecast, setCurrentForecast] = useState<Forecast[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDayForecast(coordinates).then(f => {
      setCurrentForecast(f);
      setIsLoading(false);
    });
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
    <div className="current-day-forecast">
      <p className="title">Todays Forecast: </p>
      {isLoading ? (
        <div className="loadingWrapper">{/* TODO spinner */}</div>
      ) : (
        <>
          <div className="helperWrapper">
            <div></div>
            <div className="helperCon">
              <div className="tempCon">
                <p className="helperTxt">🌡️</p>
                <p style={{ fontSize: 12 }}>(℃)</p>
              </div>
              <div className="windCon">
                <p className="helperTxt">💨</p>
                <p style={{ fontSize: 12 }}>(Km/h)</p>
              </div>
              <div className="precipCon">
                <p className="helperTxt">❄️</p>
                <p style={{ fontSize: 12 }}>(%)</p>
              </div>
            </div>
          </div>
          {currentForecast?.map(forecast => {
            return (
              <div key={forecast.time.toLocaleTimeString()} className="card">
                <p className="time">
                  {forecast.time.toLocaleTimeString().slice(0, 5)}
                </p>
                <div className="data">
                  <div className="tempCon">
                    <p className="datap">{forecast.temperature} ℃</p>
                  </div>
                  <div className="windCon">
                    <p className="datap">{forecast.windSpeed}</p>
                  </div>
                  <div className="precipCon">
                    <p className="datap">
                      {forecast.precipitationProbability}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CurrentDayForecast;

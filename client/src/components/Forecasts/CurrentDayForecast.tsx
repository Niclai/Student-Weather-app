import { getDayForecast } from "../../api/forecast";
import { Coordinates } from "../../types/location";
import { Forecast } from "../../types/forecast";
import { FC, useEffect, useState } from "react";

// import "./CurrentDayForecast.scss";
import styles from "./CurrentDayForecast.module.scss";

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
    <div className={styles.currentDayForecast}>
      <p className={styles.title}>Todays Forecast: </p>
      {isLoading ? (
        <div className={styles.loadingWrapper}>{/* TODO: spinner */}</div>
      ) : (
        <>
          <div className={styles.helperWrapper}>
            <div></div>
            <div className={styles.helperCon}>
              <div className={styles.tempCon}>
                <p className={styles.helperTxt}>🌡️</p>
                <p style={{ fontSize: 12 }}>(℃)</p>
              </div>
              <div className={styles.windCon}>
                <p className={styles.helperTxt}>💨</p>
                <p style={{ fontSize: 12 }}>(Km/h)</p>
              </div>
              <div className={styles.precipCon}>
                <p className="helperTxt">❄️</p>
                <p style={{ fontSize: 12 }}>(%)</p>
              </div>
            </div>
          </div>
          {currentForecast?.map(forecast => {
            return (
              <div
                key={forecast.time.toLocaleTimeString()}
                className={styles.card}
              >
                <p className={styles.time}>{forecast.time.getHours()}:00</p>
                <div className={styles.data}>
                  <div className={styles.tempCon}>
                    <p className={styles.datap}>{forecast.temperature} ℃</p>
                  </div>
                  <div className={styles.windCon}>
                    <p className={styles.datap}>{forecast.windSpeed}</p>
                  </div>
                  <div className={styles.precipCon}>
                    <p className={styles.datap}>
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

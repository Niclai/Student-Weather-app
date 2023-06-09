import { FC } from "react";
import { Weather, WeatherConditions } from "../../types/weather";
import * as Icons from "./WeatherIcons";

// import "./WeatherStats.scss";
import styles from "./WeatherStats.module.scss";

interface WeatherStatsProps {
  // locationName: string;
  weather: Weather;
  isDay: boolean;
}

/**
 * Get the weather icon corresponding to the given weather conditions and time
 * of day
 */
const getWeatherIcon = (
  conditions: WeatherConditions,
  isDay: boolean
): string => {
  let baseIcon;
  switch (conditions) {
    case WeatherConditions.ClearSky:
      baseIcon = Icons.ClearSky;
      break;

    case WeatherConditions.MainlyClear:
    case WeatherConditions.PartlyCloudy:
      baseIcon = Icons.PartlyCloudy;
      break;

    case WeatherConditions.Overcast:
      baseIcon = Icons.Cloudy;
      break;

    case WeatherConditions.Fog:
      baseIcon = Icons.Fog;
      break;

    case WeatherConditions.DepositingRimeFog:
      baseIcon = Icons.RimeFog;
      break;

    case WeatherConditions.LightDrizzle:
    case WeatherConditions.FreezingLightDrizzle:
    case WeatherConditions.SlightRainShower:
      baseIcon = Icons.LightDrizzle;
      break;

    case WeatherConditions.ModerateDrizzle:
    case WeatherConditions.ModerateRainShower:
      baseIcon = Icons.ModerateDrizzle;
      break;

    case WeatherConditions.DenseDrizzle:
    case WeatherConditions.FreezingDenseDrizzle:
    case WeatherConditions.ViolentRainShower:
      baseIcon = Icons.HeadyDrizzle;
      break;

    case WeatherConditions.SlightRain:
    case WeatherConditions.LightFreezingRain:
      baseIcon = Icons.SlightRain;
      break;

    case WeatherConditions.ModerateRain:
      baseIcon = Icons.ModerateRain;
      break;

    case WeatherConditions.HeavyRain:
    case WeatherConditions.HeavyFreezingRain:
      baseIcon = Icons.HeavyRain;
      break;

    case WeatherConditions.SlightSnow:
    case WeatherConditions.SlightSnowShower:
    case WeatherConditions.SnowGrains:
      baseIcon = Icons.SlightSnow;
      break;

    case WeatherConditions.ModerateSnow:
    case WeatherConditions.HeavySnow:
    case WeatherConditions.HeavySnowShower:
      baseIcon = Icons.ModerateSnow;
      break;

    case WeatherConditions.Thunderstorm:
      baseIcon = Icons.Thunderstorm;
      break;

    case WeatherConditions.ThunderstormWithSlightHail:
    case WeatherConditions.ThunderstormWithHeavyHail:
      baseIcon = Icons.ThunderstormHail;
      break;

    default:
      baseIcon = Icons.Cloudy;
  }

  return isDay ? baseIcon.day : baseIcon.night;
};

/**
 * Component for displaying basic weather stats as well as an icon to show
 * current weather conditions based on the given weather and time of day.
 */
const WeatherStats: FC<WeatherStatsProps> = ({ weather, isDay }) => {
  const weatherIcon = getWeatherIcon(weather.conditions, isDay);

  return (
    <div className={styles.weatherStats}>
      <div className={styles.iconCon}>
        <img src={weatherIcon} width={100} height={100} />
      </div>

      <div className={styles.data}>
        <p className={styles.temp}>{weather.temperature}°C</p>
        <p className={styles.wind}>{weather.windSpeed}km/h</p>
      </div>
    </div>
  );
};

export default WeatherStats;

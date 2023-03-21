import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import { Weather, WeatherConditions } from "../../types/weather";
import * as Icons from "./WeatherIcons";

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
): FC<SvgProps> => {
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
  const WeatherIcon = getWeatherIcon(weather.conditions, isDay);

  return (
    <View>
      <View style={styles.iconCon}>
        <WeatherIcon width={100} height={100} />
      </View>

      <View style={styles.data}>
        <Text style={styles.temp}>{weather.temperature}°C</Text>
        <Text style={styles.wind}>{weather.windSpeed}km/h</Text>
      </View>

      {/* <View>
      <Text>{weather.temperature}°C</Text>
      <Text>{weather.windSpeed}km/h</Text>
      <WeatherIcon width={100} height={100} />
      <Text>
        <A href="https://www.figma.com/community/file/1102960831369614781">
          Weather Icons created by Roman Davydko
        </A>
        , licensed under&nbsp;
        <A href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</A>
      </Text>
      <Text>
        <A href="https://open-meteo.com/">Weather data by Open-Meteo.com</A>,
        licensed under&nbsp;
        <A href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</A>
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconCon: {
    alignItems: "center",
    marginTop: -6,
  },
  data: {
    alignItems: "center",
  },
  temp: {
    color: "#fff",
    fontSize: 64,
    marginTop: -15,
  },
  wind: {
    color: "#fff",
    fontSize: 24,
    marginTop: -12,
  },

  link: {
    color: "#1a0dab",
    textDecorationLine: "underline",
  },
});

export default WeatherStats;

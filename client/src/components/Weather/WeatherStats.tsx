import { FC } from "react";
import { Linking, Text, View, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import { Weather, WeatherConditions } from "../../types/weather";
import * as Icons from "./WeatherIcons";

interface WeatherStatsProps {
  weather: Weather;
  isDay: boolean;
}

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
      baseIcon = Icons.SlightRain;
      break;

    case WeatherConditions.ModerateRain:
      baseIcon = Icons.ModerateRain;
      break;

    case WeatherConditions.HeavyRain:
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

const WeatherStats: FC<WeatherStatsProps> = ({ weather, isDay }) => {
  const WeatherIcon = getWeatherIcon(weather.conditions, isDay);

  return (
    <View>
      <Text>{weather.temperature}°C</Text>
      <Text>{weather.windSpeed}km/h</Text>
      <WeatherIcon width={100} height={100} />
      <Text>
        <Text
          onPress={() =>
            Linking.openURL(
              "https://www.figma.com/community/file/1102960831369614781"
            )
          }
          style={styles.link}
        >
          Weather Icons created by Roman Davydko
        </Text>
        , licensed under&nbsp;
        <Text
          onPress={() => {
            Linking.openURL("https://creativecommons.org/licenses/by/4.0/");
          }}
          style={styles.link}
        >
          CC BY 4.0
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#1a0dab",
    textDecorationLine: "underline",
  },
});

export default WeatherStats;

import { FC, useState, useEffect } from "react";
import { Linking, Text, View, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import { getWeekForecast } from "../../api/forecast";
import { Weather, WeatherConditions } from "../../types/weather";
import { getCurrentDateInFormat } from "../../utils/getCurrentDateInFormat";
import * as Icons from "./WeatherIcons";

interface WeatherStatsProps {
  locationName: string;
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
const WeatherStats: FC<WeatherStatsProps> = ({
  locationName,
  weather,
  isDay,
}) => {
  const WeatherIcon = getWeatherIcon(weather.conditions, isDay);

  return (
    <View style={styles.wrapper}>
      {locationName.split(" ").map((txt: string, index: number) => (
        <Text key={index} style={styles.location}>
          {txt}
        </Text>
      ))}

      <Text style={styles.date}>{getCurrentDateInFormat()}</Text>

      <View style={styles.iconCon}>
        <WeatherIcon width={100} height={100} />
      </View>

      <View style={styles.card}>
        <Text style={styles.temp}>{weather.temperature}°C</Text>
        <Text>{weather.windSpeed}km/h</Text>
      </View>

      {/* TODO: */}
      {/* <View>
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
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#189EDE",
    flex: 1,
    width: "100%",
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  location: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  date: {
    fontSize: 20,
    color: "#fff",
  },
  iconCon: {
    alignItems: "center",
    marginVertical: 12,
  },
  card: {
    backgroundColor: "#65b6dc",
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  temp: {
    color: "#fff",
    fontSize: 64,
  },

  link: {
    color: "#1a0dab",
    textDecorationLine: "underline",
  },
});

export default WeatherStats;

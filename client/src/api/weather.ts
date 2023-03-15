import { Weather, WeatherConditions } from "../types/weather";
import { Coordinates } from "../types/location";

const baseUrl = "https://api.open-meteo.com";

interface OpenMeteoCurrentWeatherRespones {
  current_weather:{
    temperature: number;
    windspeed: number;
    weathercode: number;
  }
};

const getWeatherCode = (weatherCode: number) => {
  let weatherCodeMap = new Map();
  
  weatherCodeMap.set(0, WeatherConditions.ClearSky);
  weatherCodeMap.set(1, WeatherConditions.MainlyClear);
  weatherCodeMap.set(2, WeatherConditions.PartlyCloudy);
  weatherCodeMap.set(3, WeatherConditions.Overcast);
  weatherCodeMap.set(45, WeatherConditions.Fog);
  weatherCodeMap.set(48, WeatherConditions.DepositingRimeFog);
  weatherCodeMap.set(51, WeatherConditions.LightDrizzle);
  weatherCodeMap.set(53, WeatherConditions.ModerateDrizzle);
  weatherCodeMap.set(55, WeatherConditions.DenseDrizzle);
  weatherCodeMap.set(56, WeatherConditions.FreezingLightDrizzle);
  weatherCodeMap.set(57, WeatherConditions.FreezingDenseDrizzle);
  weatherCodeMap.set(61, WeatherConditions.SlightRain);
  weatherCodeMap.set(63, WeatherConditions.ModerateRain);
  weatherCodeMap.set(65, WeatherConditions.HeavyRain);
  weatherCodeMap.set(66, WeatherConditions.LightFreezingRain);
  weatherCodeMap.set(67, WeatherConditions.HeavyFreezingRain);
  weatherCodeMap.set(71, WeatherConditions.SlightSnow);
  weatherCodeMap.set(73, WeatherConditions.ModerateSnow);
  weatherCodeMap.set(75, WeatherConditions.HeavySnow);
  weatherCodeMap.set(77, WeatherConditions.SnowGrains);
  weatherCodeMap.set(80, WeatherConditions.SlightRainShower);
  weatherCodeMap.set(81, WeatherConditions.ModerateRainShower);
  weatherCodeMap.set(82, WeatherConditions.ViolentRainShower);
  weatherCodeMap.set(85, WeatherConditions.SlightSnowShower);
  weatherCodeMap.set(86, WeatherConditions.HeavySnowShower);
  weatherCodeMap.set(95, WeatherConditions.Thunderstorm);
  weatherCodeMap.set(96, WeatherConditions.ThunderstormWithSlightHail);
  weatherCodeMap.set(99, WeatherConditions.ThunderstormWithHeavyHail);

  return weatherCodeMap.get(weatherCode);
}


const getCurrentWeather = async (coordinates: Coordinates): Promise<Weather> => {
  const response = await fetch(
    `${baseUrl}/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}` +
      `&current_weather=true`
  );

  const json: OpenMeteoCurrentWeatherRespones = await response.json();
  const { current_weather } = json

  return {
    temperature: current_weather.temperature,
    windSpeed: current_weather.windspeed,
    conditions: getWeatherCode(current_weather.weathercode),
  };
};

export { getCurrentWeather };

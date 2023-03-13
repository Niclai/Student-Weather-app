/**
 * TODO implement in #38
 */
export interface Weather {
  temperature: number;
  windSpeed: number;
  conditions: WeatherConditions;
}

export enum WeatherConditions {
  ClearSky,
  MainlyClear,
  PartlyCloudy,
  Overcast,
  Fog,
  DepositingRimeFog,
  LightDrizzle,
  ModerateDrizzle,
  DenseDrizzle,
  FreezingLightDrizzle,
  FreezingDenseDrizzle,
  SlightRain,
  ModerateRain,
  HeavyRain,
  SlightSnow,
  ModerateSnow,
  HeavySnow,
  SnowGrains,
  SlightRainShow,
  ModerateRainShower,
  ViolentRainShower,
  SlightSnowShower,
  HeavySnowShower,
  Thunderstorm,
  ThunderstormWithSlightHail,
  ThunderstormWithHeavyHail,
}

WeatherConditions.ClearSky.toString();

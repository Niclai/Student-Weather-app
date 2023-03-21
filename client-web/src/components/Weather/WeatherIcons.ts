import { FC } from "react";

import ClearDayIcon from "../../assets/weather-icons/clear-day.svg";
import ClearNightIcon from "../../assets/weather-icons/clear-night.svg";
import PartlyCloudyDayIcon from "../../assets/weather-icons/partly-cloudy-day.svg";
import PartlyCloudyNightIcon from "../../assets/weather-icons/partly-cloudy-night.svg";
import CloudyIcon from "../../assets/weather-icons/cloudy.svg";
import FogIcon from "../../assets/weather-icons/fog.svg";
import RimeFogIcon from "../../assets/weather-icons/rime-fog.svg";
import HeavyDrizzleIcon from "../../assets/weather-icons/heavy-drizzle.svg";
import HeavyRainIcon from "../../assets/weather-icons/heavy-rain.svg";
import LightDrizzleIcon from "../../assets/weather-icons/light-drizzle.svg";
import ModerateDrizzleIcon from "../../assets/weather-icons/moderate-drizzle.svg";
import ModerateRainIcon from "../../assets/weather-icons/moderate-rain.svg";
import ModerateSnowIcon from "../../assets/weather-icons/moderate-snow.svg";
import SlightRainIcon from "../../assets/weather-icons/slight-rain.svg";
import SlightSnowIcon from "../../assets/weather-icons/slight-snow.svg";
import ThunderstormIcon from "../../assets/weather-icons/thunderstorm.svg";
import ThunderstormHailIcon from "../../assets/weather-icons/thunderstorm-hail.svg";

// Load all icons in day and night variants

interface WeatherIcon {
  day: string;
  night: string;
}

/**
 * Some icons are the same in their day and night variants, hence this helper
 * factory function can be used to simplify the WeatherIcon object creation.
 */
const singleIcon = (icon: string): WeatherIcon => ({
  day: icon,
  night: icon,
});

export const ClearSky: WeatherIcon = {
  day: ClearDayIcon,
  night: ClearNightIcon,
};

export const PartlyCloudy: WeatherIcon = {
  day: PartlyCloudyDayIcon,
  night: PartlyCloudyNightIcon,
};

export const Cloudy: WeatherIcon = singleIcon(CloudyIcon);

export const Fog: WeatherIcon = singleIcon(FogIcon);

export const RimeFog: WeatherIcon = singleIcon(RimeFogIcon);

export const HeadyDrizzle: WeatherIcon = singleIcon(HeavyDrizzleIcon);

export const HeavyRain: WeatherIcon = singleIcon(HeavyRainIcon);

export const LightDrizzle: WeatherIcon = singleIcon(LightDrizzleIcon);

export const ModerateDrizzle: WeatherIcon = singleIcon(ModerateDrizzleIcon);

export const ModerateRain: WeatherIcon = singleIcon(ModerateRainIcon);

export const ModerateSnow: WeatherIcon = singleIcon(ModerateSnowIcon);

export const SlightRain: WeatherIcon = singleIcon(SlightRainIcon);

export const SlightSnow: WeatherIcon = singleIcon(SlightSnowIcon);

export const Thunderstorm: WeatherIcon = singleIcon(ThunderstormIcon);

export const ThunderstormHail: WeatherIcon = singleIcon(ThunderstormHailIcon);

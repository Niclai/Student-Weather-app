import { DaylightHours } from "../types/daylightHours";
import { Forecast } from "../types/forecast";
import { UserPreferences } from "../types/userPreferences";
import { scheduleDay, scheduleWeek } from "./scheduling";
import { test, expect } from "vitest";

const dummyPreferences: UserPreferences = {
  location: undefined,
  hayFever: false,
  sessionDuration: 1,
  timesPerWeek: 2,
  timeBeforeNotif: 0,
  preferredMinTemp: 0,
  preferredMaxTemp: 0,
  maxWindSpeed: 0,
  maxPollenLevels: 0,
};

const currentTime = new Date();

const midnightToday = new Date(currentTime);
midnightToday.setHours(0);
midnightToday.setMinutes(0);
midnightToday.setSeconds(0);

const midnightTomorrow = new Date(midnightToday);
midnightTomorrow.setDate(midnightToday.getDate() + 1);

const dummyDaylightHours = {
  sunrise: midnightToday,
  sunset: midnightTomorrow,
};

const generateDate = (
  hours: number,
  minutes = 0,
  day: Date = currentTime
): Date => {
  const date = new Date(day);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  return date;
};
const generateDaylightHours = (day?: Date) => ({
  sunrise: generateDate(7, 0, day),
  sunset: generateDate(20, 0, day),
});

interface ForecastOverride {
  temperature: number;
  windSpeed: number;
  precipitationProbability: number;
}

interface ForecastOverrideTable {
  [Key: number]: ForecastOverride;
}

const generateDummyForecasts = (
  overrides: ForecastOverrideTable = {},
  day?: Date
): Forecast[] =>
  [...Array(24)].map((_, i) => {
    const time = generateDate(i, 0, day);
    return overrides[i] != null
      ? {
          time,
          ...overrides[i],
        }
      : {
          time,
          temperature: 0,
          windSpeed: 0,
          precipitationProbability: 0,
        };
  });

test("scheduleDay given empty forecast array throws Error", () => {
  expect(() => scheduleDay(dummyDaylightHours, [], dummyPreferences)).toThrow(
    Error("expected 24 entries in forecast array, but got 0")
  );
});

test(
  "scheduleDay given all hours of the day match preferences" +
    "returns all hours except those where information about next day is needed",
  () => {
    const dummyForecasts = generateDummyForecasts();

    expect(
      scheduleDay(dummyDaylightHours, dummyForecasts, dummyPreferences)
    ).toStrictEqual(dummyForecasts.map(forecast => forecast.time).slice(0, 23));
  }
);

test("scheduleDay given some hours match temperature, returns only matching hours", () => {
  const temperaturePreferences: UserPreferences = {
    ...dummyPreferences,
    preferredMinTemp: 20,
    preferredMaxTemp: 25,
  };

  const temperatureForecastOverride = (
    temperature: number
  ): ForecastOverride => ({
    temperature,
    windSpeed: 0,
    precipitationProbability: 0,
  });

  const forecasts = generateDummyForecasts({
    0: temperatureForecastOverride(20),
    1: temperatureForecastOverride(20),
    10: temperatureForecastOverride(22),
    11: temperatureForecastOverride(22),
    22: temperatureForecastOverride(25),
    23: temperatureForecastOverride(24),
  });

  expect(
    scheduleDay(dummyDaylightHours, forecasts, temperaturePreferences)
  ).toStrictEqual([0, 10, 22].map(hour => generateDate(hour, 0)));
});

test("scheduleDay given some hours match wind speed and temperature ,returns only matching hours", () => {
  const temperaturePreferences: UserPreferences = {
    ...dummyPreferences,
    preferredMinTemp: 20,
    preferredMaxTemp: 25,
    maxWindSpeed: 5,
  };

  const forecasts = generateDummyForecasts({
    0: {
      temperature: 22,
      windSpeed: 10,
      precipitationProbability: 0,
    },
    1: {
      temperature: 22,
      windSpeed: 10,
      precipitationProbability: 0,
    },
    13: {
      temperature: 22,
      windSpeed: 5,
      precipitationProbability: 0,
    },
    14: {
      temperature: 22,
      windSpeed: 5,
      precipitationProbability: 0,
    },
  });

  expect(
    scheduleDay(dummyDaylightHours, forecasts, temperaturePreferences)
  ).toStrictEqual([13].map(hour => generateDate(hour, 0)));
});

test("scheduleDay given some hours match wind speed and temperature and zero rainfall, returns only matching hours", () => {
  const temperaturePreferences: UserPreferences = {
    ...dummyPreferences,
    preferredMinTemp: 20,
    preferredMaxTemp: 25,
    maxWindSpeed: 5,
  };

  const forecasts = generateDummyForecasts({
    0: {
      temperature: 22,
      windSpeed: 5,
      precipitationProbability: 0,
    },
    1: {
      temperature: 22,
      windSpeed: 5,
      precipitationProbability: 0,
    },
    13: {
      temperature: 22,
      windSpeed: 5,
      precipitationProbability: 10,
    },
    14: {
      temperature: 22,
      windSpeed: 5,
      precipitationProbability: 0,
    },
  });

  expect(
    scheduleDay(dummyDaylightHours, forecasts, temperaturePreferences)
  ).toStrictEqual([0].map(hour => generateDate(hour, 0)));
});

test("scheduleDay only returns hours where weather conditions match for entire session duration", () => {
  const temperaturePreferences: UserPreferences = {
    ...dummyPreferences,
    preferredMinTemp: 20,
    preferredMaxTemp: 25,
    sessionDuration: 2,
  };

  const warmForecastOverride = {
    temperature: 22,
    windSpeed: 0,
    precipitationProbability: 0,
  };

  const forecasts = generateDummyForecasts({
    7: warmForecastOverride,
    10: warmForecastOverride,
    15: warmForecastOverride,
    16: warmForecastOverride,
    17: warmForecastOverride,
    18: warmForecastOverride,
    21: warmForecastOverride,
    22: warmForecastOverride,
    23: warmForecastOverride,
  });

  expect(
    scheduleDay(dummyDaylightHours, forecasts, temperaturePreferences)
  ).toStrictEqual([15, 16, 21].map(hour => generateDate(hour, 0)));
});

test("scheduleDay only returns hours between sunrise and sunset, taking sessionDuration into consideration", () => {
  const temperaturePreferences: UserPreferences = {
    ...dummyPreferences,
    preferredMinTemp: 20,
    preferredMaxTemp: 25,
    sessionDuration: 2,
  };

  const daylightHours: DaylightHours = {
    sunrise: generateDate(7, 45),
    sunset: generateDate(17, 15),
  };

  const warmForecastOverride = {
    temperature: 22,
    windSpeed: 0,
    precipitationProbability: 0,
  };

  const forecasts = generateDummyForecasts({
    0: warmForecastOverride,
    7: warmForecastOverride,
    8: warmForecastOverride,
    9: warmForecastOverride,
    10: warmForecastOverride,
    11: warmForecastOverride,
    15: warmForecastOverride,
    16: warmForecastOverride,
    17: warmForecastOverride,
    18: warmForecastOverride,
    23: warmForecastOverride,
  });

  expect(
    scheduleDay(daylightHours, forecasts, temperaturePreferences)
  ).toStrictEqual([8, 9, 15].map(hour => generateDate(hour, 0)));
});

test("scheduleWeek given less than 7 days forecasts throws Error", () => {
  const weekForecasts: {
    daylightHours: DaylightHours;
    forecasts: Forecast[];
  }[] = [...Array(6)].map((_, i) => {
    const day = new Date();
    day.setDate(day.getDate() + i);
    return {
      daylightHours: generateDaylightHours(day),
      forecasts: generateDummyForecasts({}, day),
    };
  });

  expect(() => {
    scheduleWeek(weekForecasts, dummyPreferences);
  }).toThrow(Error("expected 7 entries in weekForecasts array, but got 6"));
});

test("scheduleWeek picks the number of sessions specified by user given there are more candidate sessions", () => {
  const weekForecasts: {
    daylightHours: DaylightHours;
    forecasts: Forecast[];
  }[] = [...Array(7)].map((_, i) => {
    const day = new Date();
    day.setDate(day.getDate() + i);
    return {
      daylightHours: generateDaylightHours(day),
      forecasts: generateDummyForecasts({}, day),
    };
  });

  expect(scheduleWeek(weekForecasts, dummyPreferences)).toHaveLength(
    dummyPreferences.timesPerWeek
  );
});

test("scheduleWeek picks the number of sessions specified by user given there are as many candidates as specified by user", () => {
  const temperaturePreferences: UserPreferences = {
    ...dummyPreferences,
    preferredMinTemp: 20,
    preferredMaxTemp: 25,
  };

  const weekForecasts: {
    daylightHours: DaylightHours;
    forecasts: Forecast[];
  }[] = [0, 1, 3, 4, 6]
    .map(i => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      return {
        daylightHours: generateDaylightHours(day),
        forecasts: generateDummyForecasts({}, day),
      };
    })
    .concat(
      [2, 5].map(i => {
        const day = new Date();
        day.setDate(day.getDate() + i);
        return {
          daylightHours: generateDaylightHours(day),
          forecasts: generateDummyForecasts(
            {
              12: {
                temperature: 23,
                windSpeed: 0,
                precipitationProbability: 0,
              },
              13: {
                temperature: 23,
                windSpeed: 0,
                precipitationProbability: 0,
              },
            },
            day
          ),
        };
      })
    );

  expect(scheduleWeek(weekForecasts, temperaturePreferences)).toHaveLength(
    temperaturePreferences.timesPerWeek
  );
});

test("scheduleWeek picks all candidate sessions given there are as less candidates than specified by user", () => {
  const temperaturePreferences: UserPreferences = {
    ...dummyPreferences,
    preferredMinTemp: 20,
    preferredMaxTemp: 25,
  };

  const weekForecasts: {
    daylightHours: DaylightHours;
    forecasts: Forecast[];
  }[] = [0, 1, 3, 4, 5, 6]
    .map(i => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      return {
        daylightHours: generateDaylightHours(day),
        forecasts: generateDummyForecasts({}, day),
      };
    })
    .concat(
      [2].map(i => {
        const day = new Date();
        day.setDate(day.getDate() + i);
        return {
          daylightHours: generateDaylightHours(day),
          forecasts: generateDummyForecasts(
            {
              12: {
                temperature: 23,
                windSpeed: 0,
                precipitationProbability: 0,
              },
              13: {
                temperature: 23,
                windSpeed: 0,
                precipitationProbability: 0,
              },
            },
            day
          ),
        };
      })
    );

  expect(scheduleWeek(weekForecasts, temperaturePreferences)).toHaveLength(1);
});

test("scheduleWeek returns empty list given no candidate sessions", () => {
  const temperaturePreferences: UserPreferences = {
    ...dummyPreferences,
    preferredMinTemp: 20,
    preferredMaxTemp: 25,
  };

  const weekForecasts: {
    daylightHours: DaylightHours;
    forecasts: Forecast[];
  }[] = [...Array(7)].map((_, i) => {
    const day = new Date();
    day.setDate(day.getDate() + i);
    return {
      daylightHours: generateDaylightHours(day),
      forecasts: generateDummyForecasts({}, day),
    };
  });

  expect(scheduleWeek(weekForecasts, temperaturePreferences)).toHaveLength(0);
});

test("scheduleWeek filters out hours that happened in the past", () => {
  const weekForecasts: {
    daylightHours: DaylightHours;
    forecasts: Forecast[];
  }[] = [-6, -5, -4, -3, -2, -1, 1].map(i => {
    const day = new Date();
    day.setDate(day.getDate() + i);
    return {
      daylightHours: generateDaylightHours(day),
      forecasts: generateDummyForecasts({}, day),
    };
  });

  const schedule = scheduleWeek(weekForecasts, dummyPreferences);
  expect(schedule).toHaveLength(dummyPreferences.timesPerWeek);
  schedule.forEach(session =>
    expect(session.getDate()).toEqual(midnightTomorrow.getDate())
  );
});

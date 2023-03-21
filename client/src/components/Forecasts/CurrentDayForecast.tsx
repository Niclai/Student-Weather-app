import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getDayForecast } from "../../api/forecast";
import { Coordinates } from "../../types/location";
import { Forecast } from "../../types/forecast";
import { FC, useEffect, useState } from "react";

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
    <View style={styles.wrapper}>
      <Text style={styles.title}>Todays Forecast: </Text>
      {isLoading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color={"#189EDE"} size={60} />
        </View>
      ) : (
        <>
          <View style={styles.helperWrapper}>
            <View></View>
            <View style={styles.helperCon}>
              <View style={styles.tempCon}>
                <Text style={styles.helperTxt}>🌡️</Text>
                <Text style={{ fontSize: 12 }}>(℃)</Text>
              </View>
              <View style={styles.windCon}>
                <Text style={styles.helperTxt}>💨</Text>
                <Text style={{ fontSize: 12 }}>(Km/h)</Text>
              </View>
              <View style={styles.precipCon}>
                <Text style={styles.helperTxt}>❄️</Text>
                <Text style={{ fontSize: 12 }}>(%)</Text>
              </View>
            </View>
          </View>
          {currentForecast?.map(forecast => {
            return (
              <View
                key={forecast.time.toLocaleTimeString()}
                style={styles.card}
              >
                <Text style={styles.time}>
                  {forecast.time.toLocaleTimeString().slice(0, 5)}
                </Text>
                <View style={styles.data}>
                  <View style={styles.tempCon}>
                    <Text style={styles.dataText}>
                      {forecast.temperature} ℃
                    </Text>
                  </View>
                  <View style={styles.windCon}>
                    <Text style={styles.dataText}>{forecast.windSpeed}</Text>
                  </View>
                  <View style={styles.precipCon}>
                    <Text style={styles.dataText}>
                      {forecast.precipitationProbability}%
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
  },
  loadingWrapper: {
    height: 200,
    paddingTop: 30,
  },
  helperWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 4,
  },
  helperCon: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  helperTxt: {
    fontSize: 20,
    height: 30,
  },
  card: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: "#338eb95c",
    padding: 4,
    paddingVertical: 6,
    borderRadius: 8,
  },
  time: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  data: {
    flexDirection: "row",
  },
  tempCon: {
    width: 50,
    marginRight: 14,
    alignItems: "center",
  },
  windCon: {
    width: 50,
    alignItems: "center",
    marginRight: 14,
  },
  precipCon: {
    width: 40,
    alignItems: "center",
    marginRight: 14,
  },
  dataText: {
    fontSize: 16,
  },
});

export default CurrentDayForecast;

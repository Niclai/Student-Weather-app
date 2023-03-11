import * as Location from "expo-location";
import { Coordinates } from "../types/location";

async function getCurrentCoordinates(): Promise<Coordinates> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  const location = await Location.getCurrentPositionAsync({});
  return { long: location.coords.longitude, lat: location.coords.latitude };
}

export { getCurrentCoordinates };

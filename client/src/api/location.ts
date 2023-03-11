import * as Location from "expo-location";
import { Coordinates } from "../types/location";

async function getCurrentCoordinates(): Promise<Coordinates> {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  let location = await Location.getCurrentPositionAsync({});
  return { long: location.coords.longitude, lat: location.coords.latitude };
}

export { getCurrentCoordinates };

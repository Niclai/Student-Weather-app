import * as GPSLocation from "expo-location";
import { Coordinates, Location } from "../types/location";

async function getCurrentCoordinates(): Promise<Coordinates> {
  const { status } = await GPSLocation.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  const location = await GPSLocation.getCurrentPositionAsync({});
  return { long: location.coords.longitude, lat: location.coords.latitude };
}

interface GoogleMapsReverseGeocodingResponse {
  results: {
    formatted_address: string;
  }[];
}

async function getLocationName(coords: Coordinates): Promise<string> {
  const response = await fetch(
    `${baseUrl}/maps/api/geocode/json?latlng=${coords.lat},${coords.long}&result_type=political`
  );
  const json: GoogleMapsReverseGeocodingResponse = await response.json();
  return json.results[0].formatted_address;
}

async function getCurrentLocation(): Promise<Location> {
  const coordinates = await getCurrentCoordinates();
  const locationName = await getLocationName(coordinates);

  return { name: locationName, coords: coordinates };
}

export { getCurrentLocation };

import { baseUrl } from "../env/variables";
import { Coordinates, Location } from "../types/location";

interface GoogleMapsGeocodingResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

/**
 * Get the coordinates corresponding to the location with the given Google
 * placeId received from the Places API
 */
async function getCoordinates(placeId: string): Promise<Coordinates> {
  const response = await fetch(
    `${baseUrl}/maps/api/geocode/json?place_id=${placeId}`
  );
  const json: GoogleMapsGeocodingResponse = await response.json();
  const { lat, lng } = json.results[0].geometry.location;
  return { lat, long: lng };
}

/**
 * Get the user's current coordinates by making a call to the native GPS API
 */
const getCurrentCoordinates = async (): Promise<Coordinates> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      location => {
        resolve({
          long: location.coords.longitude,
          lat: location.coords.latitude,
        });
      },
      error => {
        reject(error);
      }
    );
  });

interface GoogleMapsReverseGeocodingResponse {
  results: {
    formatted_address: string;
  }[];
}

/**
 * Get the "political" name corresponding to the given coordinates according to
 * the Google Geocoding API. Rather then returning the exact address found under
 * the given coordinates, it returns the full name of the area/district the
 * location resides in. E.g. "South Williamsburg, Brooklyn, NY, USA".
 */
async function getLocationName(coords: Coordinates): Promise<string> {
  const response = await fetch(
    `${baseUrl}/maps/api/geocode/json?latlng=${coords.lat},${coords.long}&result_type=political`
  );
  const json: GoogleMapsReverseGeocodingResponse = await response.json();
  return json.results[0].formatted_address;
}

/**
 * Get the current location of the user, using the device's GPS API and Google
 * Geocoding API to map the GPS coordinates to a location name.
 */
async function getCurrentLocation(): Promise<Location> {
  const coordinates = await getCurrentCoordinates();
  const locationName = await getLocationName(coordinates);

  return { name: locationName, coords: coordinates };
}

export { getCoordinates, getCurrentLocation };

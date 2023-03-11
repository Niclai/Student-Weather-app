import { baseUrl } from "../env/variables";
import { Coordinates } from "../types/location";

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

async function getCoordinates(placeId: string): Promise<Coordinates> {
  const response = await fetch(
    `${baseUrl}/maps/api/geocode/json?place_id=${placeId}`
  );
  const json: GoogleMapsGeocodingResponse = await response.json();
  const { lat, lng } = json.results[0].geometry.location;
  return { lat, long: lng };
}

export { getCoordinates };

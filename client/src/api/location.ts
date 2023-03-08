import { baseUrl } from "../env/variables";
import { Coordinates } from "../types/location";

async function getCoordinates(placeId: string): Promise<Coordinates> {
  const response = await fetch(
    `${baseUrl}/maps/api/geocode/json?place_id=${placeId}`
  );
  const json = await response.json();
  return json.results[0].geometry.location;
}

export { getCoordinates };

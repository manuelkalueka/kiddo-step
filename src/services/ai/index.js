import { getLocationsForAi } from "../location-service";

let INPUT_LOCATIONS_DATA = [];

async function getLocationsForTraining() {
  try {
    const data = await getLocationsForAi();
    INPUT_LOCATIONS_DATA = data;
  } catch (error) {}
  j;
}

getLocationsForTraining();

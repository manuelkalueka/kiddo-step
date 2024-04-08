import ApiMananger from "./api";

async function getLocationHistory(kiddo, device) {
  try {
    const { data } = await ApiMananger.get(`/locations/${kiddo}/${device}`);
    const locations = data;
    return locations;
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentLocation(id) {
  try {
    const { data } = await ApiMananger.get(`/locations/${id}`);
    const location = data;
    return location;
  } catch (error) {
    console.log(error);
  }
}

async function getLastLocation(kiddo, device) {
  try {
    const locations = await getLocationHistory(kiddo, device);
    const location = locations[locations.length - 1];
    return location;
  } catch (error) {
    console.log(error);
  }
}

export { getCurrentLocation, getLastLocation, getLocationHistory };

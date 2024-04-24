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

async function saveLocation(latitude, longitude, kiddo, device, timestamp) {
  try {
    const { data } = await ApiMananger.post(`/locations`, {
      latitude,
      longitude,
      kiddo,
      device,
      timestamp,
    });
    return data;
  } catch (error) {
    console.error("Erro ao salvar localização:", error);
    throw error;
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
    const location = locations?.pop();
    return location;
  } catch (error) {
    console.log("Erro ao buscar a ultima localização");
    throw error;
  }
}

export {
  getCurrentLocation,
  getLastLocation,
  getLocationHistory,
  saveLocation,
};

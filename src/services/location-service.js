import ApiMananger from "./api";

async function getLocationHistory(kiddo) {
  try {
    const { data } = await ApiMananger.get(`/locations/${kiddo}`);
    const locations = data;
    return locations;
  } catch (error) {
    console.log("Erro ao buscar o historico de localização", error);
  }
}

async function saveLocation(latitude, longitude, kiddo, timestamp) {
  try {
    const { data } = await ApiMananger.post(`/locations`, {
      latitude,
      longitude,
      kiddo,
      timestamp,
    });
    return data;
  } catch (error) {
    console.error("Erro ao salvar localização:", error);
  }
}

async function getCurrentLocation(id) {
  try {
    const { data } = await ApiMananger.get(`/locations/item/${id}`);
    const location = data;
    return location;
  } catch (error) {
    console.log("Erro ao buscar localização actual", error);
  }
}

async function getLastLocation(kiddo) {
  try {
    const locations = await getLocationHistory(kiddo);
    const location = locations[locations.length - 1];
    return location;
  } catch (error) {
    console.log("Erro ao buscar a ultima localização", error);
  }
}

export {
  getCurrentLocation,
  getLastLocation,
  getLocationHistory,
  saveLocation,
};

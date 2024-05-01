import ApiMananger from "./api";

async function getGeoFencings(kiddo) {
  const id = kiddo._id;
  try {
    const { data } = await ApiMananger.get(`/geoFence/${id}`);
    return data;
  } catch (error) {
    console.log("Erro ao Buscar geo fencings", error);
  }
}

async function setGeoFencing(kiddo) {
  const id = kiddo._id;
  try {
    const { data } = await ApiMananger.get(`/geoFence/${id}`);
    return data;
  } catch (error) {
    console.log("Erro ao Buscar geo fencings", error);
  }
}

async function createGeoFence(data, idKiddo) {
  try {
    const { target, name, radius, status, latitude, longitude } = data;
    if (target === true) {
      const response = await ApiMananger.post("/geoFence", {
        name,
        radius,
        status,
        latitude,
        longitude,
        target: idKiddo,
      });
      return response.status;
    } else {
      throw new Error("Selecciona um alvo para Cerca");
    }
  } catch (error) {
    console.log("Cannot create Fence ", error);
  }
}

export { getGeoFencings, setGeoFencing, createGeoFence };

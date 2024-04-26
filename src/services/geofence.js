import ApiMananger from "../services/api";
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

export { createGeoFence };

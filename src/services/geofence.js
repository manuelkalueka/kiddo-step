import ApiMananger from "../services/api";
import { Alert } from "react-native";
async function createGeoFence(data, idKiddo) {
  try {
    const { target, geoType, name, radius, status, latitude, longitude } = data;
    if (target === true) {
      const response = await ApiMananger.post("/geoFence", {
        geoType,
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

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



export { getGeoFencings, setGeoFencing };

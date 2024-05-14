import ApiMananger from "./api";

async function listAlertsService() {
  try {
    const { data } = await ApiMananger.get(`/alertSchedule`); //Ajustar a chamada
    return data;
  } catch (error) {
    console.log("Erro ao buscar alertas", error);
  }
}

async function saveAlertSchedule(data) {
  try {
    let { title, type, geofecing, hourTrigger } = data;
    hourTrigger = new Date(hourTrigger);
    const newData = {
      title,
      type,
      geofecing,
      hourTrigger,
    };
    const response = await ApiMananger.post("/alertSchedule", newData);
    return response;
  } catch (error) {
    console.log("erro ao salvar alerta", error);
  }
}

export { listAlertsService, saveAlertSchedule };

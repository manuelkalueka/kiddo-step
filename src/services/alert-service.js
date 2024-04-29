import ApiMananger from "./api";

async function listAlertsService(geoFence) {
  try {
    const { data } = await ApiMananger.get(`/alertSchedule/${geoFence}`); //Ajustar a chamada
    return data;
  } catch (error) {
    console.log("Erro ao buscar alertas", error);
  }
}

async function saveAlertSchedule(data) {
  const { title, body, type, hourTrigger, geofecing } = data;
  try {
    await ApiMananger.post("/alertSchedule", {
      title,
      body,
      type,
      hourTrigger,
      geofecing,
    });
  } catch (error) {
    console.log("erro ao salvar alerta", error);
  }
}

export { listAlertsService, saveAlertSchedule };

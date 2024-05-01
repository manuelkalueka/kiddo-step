import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { getAlertServiceForActivity } from "./alert-service";

const GeofencingActivity = (geofence) => {
  const [alertForFence, setAlertForFence] = useState;
  const [regions, setRegions] = useState([]);

  async function getAlertForFence() {
    try {
      const alert = await getAlertServiceForActivity(geofence);
      setAlertForFence(alert);
    } catch (error) {
      console.log("Erro ao buscar cercas no geo cerca", error);
    }
  }

  useEffect(() => {
    getAlertForFence();
  }, [geofence]);

  useEffect(() => {
    // Define as coordenadas do centro da cerca geográfica
    const notifyOnEnter = alertForFence.type === "Entrada" ? true : false;
    const notifyOnExit = alertForFence.type === "Saída" ? true : false;

    const region = {
      latitude: alertForFence.geofecing.latitude,
      longitude: alertForFence.geofecing.longitude,
      radius: alertForFence.geofecing.radius,
    };

    // Define as configurações de geofencing
    const geofencing = {
      region,
      notifyOnEnter, // Notificar quando o dispositivo entra na cerca
      notifyOnExit, // Notificar quando o dispositivo sai da cerca
    };

    // Inicia o monitoramento da cerca geográfica
    Location.startGeofencingAsync("geofencing", [geofencing])
      .then(() => console.log("Geofencing iniciado com sucesso"))
      .catch((error) => console.error("Erro ao iniciar geofencing:", error));

    // Função de limpeza ao desmontar o componente
    return () => {
      Location.stopGeofencingAsync("geofencing")
        .then(() => console.log("Geofencing parado com sucesso"))
        .catch((error) => console.error("Erro ao parar geofencing:", error));
    };
  }, []);

  // Manipular eventos de entrada e saída da cerca geográfica
  Location.addGeofencingRegionStateListener(async ({ region, state }) => {
    if (state === Location.GeofencingRegionState.Entered) {
      console.log(`Entrou na região: ${region.identifier}`);
    } else if (state === Location.GeofencingRegionState.Exited) {
      console.log(`Saiu da região: ${region.identifier}`);
    }
  });
};

export default GeofencingActivity;

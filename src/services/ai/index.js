import { useEffect, useState } from "react";
import { getLocationsForAi } from "../location-service";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

const [inputLocationData, setInputLocationData] = useState([]);

useEffect(() => {
  getLocationsForTraining();
}, []);

async function getLocationsForTraining() {
  try {
    const data = await getLocationsForAi();
    setInputLocationData(data);
  } catch (error) {
    console.log("Erro ao receber os dados para a IA");
  }
}
import { getLocationsForAi } from "../location-service";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

// Função para obter dados de treinamento
async function getLocationsForTraining() {
  try {
    const data = await getLocationsForAi(); // GET -> Json [{latitude, longitude},{latitude, longitude},...]
    return data.map((location) => [location.latitude, location.longitude]);
  } catch (error) {
    console.error("Erro ao receber os dados para a IA", error);
    return [];
  }
}

// Função para carregar o modelo
const loadModel = async () => {
  await tf.ready(); // Não fazer nada sem o tensorflow estar ready

  const model = tf.sequential();
  model.add(
    tf.layers.lstm({
      units: 16, // Quantidade de Neuronios
      inputShape: [3, 2],
      kernelInitializer: "glorotUniform",
    })
  );
  model.add(
    tf.layers.dense({
      units: 2,
      kernelInitializer: "glorotUniform",
    })
  );

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  return model;
};

// Função para treinar o modelo
const trainModel = async (model, inputData, outputData) => {
  const xs = tf.tensor3d(inputData, [inputData.length, inputData[0].length, 2]);
  const ys = tf.tensor2d(outputData, [outputData.length, 2]);

  await model.fit(xs, ys, {
    epochs: 5,
    batchSize: 32,
  });

  return model;
};

// Função para rodar o treinamento
const runTraining = async () => {
  const locations = await getLocationsForTraining();

  if (locations.length < 4) {
    console.error("Não há dados suficientes para treinamento.");
    return;
  }

  const inputData = locations
    .slice(0, -1)
    .map((_, index) => {
      return locations.slice(index, index + 3);
    })
    .filter((seq) => seq.length === 3);

  const outputData = locations.slice(3);

  if (inputData.length !== outputData.length) {
    console.error("Dados de entrada e saída não são consistentes.");
    return;
  }

  const model = await loadModel();
  await trainModel(model, inputData, outputData);

  console.log("Model trained successfully");
};

// Função para fazer a predição
const predictLocation = async (model, recentLocations) => {
  const inputTensor = tf.tensor3d([recentLocations], [1, 3, 2]);
  const prediction = model.predict(inputTensor);
  const predictedLocation = prediction.arraySync()[0];

  return {
    latitude: predictedLocation[0],
    longitude: predictedLocation[1],
  };
};

export { runTraining, predictLocation };

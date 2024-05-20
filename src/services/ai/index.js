import { getLocationsForAi } from "../location-service";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system"

const modelPath = `${FileSystem.documentDirectory}model/model.json`;

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
      inputShape: [3, 2], // 3 timesteps (Séries temporais), 2 features (Atributos de Objectos) (latitude, longitude)
      kernelInitializer: "glorotUniform",
    })
  );
  model.add(
    tf.layers.dense({
      units: 2, // 2 outputs (latitude, longitude)
      kernelInitializer: "glorotUniform",
    })
  );

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  return model;
};

// Função para treinar o modelo
const trainModel = async (model, inputData, outputData) => {
  //Entradas, números de sequencias(3), número de timestap(3), atributos(lat, long)
  const xs = tf.tensor3d(inputData, [inputData.length, inputData[0].length, 2]);
  const ys = tf.tensor2d(outputData, [outputData.length, 2]); //sequencia deve ser igual ao Input

  await model.fit(xs, ys, {
    epochs: 4,
    batchSize: 32,
  }); //Machine Learning Supervisionada

  return model;
};

// Função para rodar o treinamento
const runTraining = async () => {
  const locations = await getLocationsForTraining();

  if (locations.length < 4) {
    console.error("Não há dados suficientes para treinamento.");
    return;
  }

  // Gerar dados de entrada e saída de forma consistente
  const inputData = [];
  const outputData = [];

  for (let i = 0; i <= locations.length - 4; i++) {
    inputData.push(locations.slice(i, i + 3));
    outputData.push(locations[i + 3]);
  }

  if (inputData.length !== outputData.length) {
    console.error("Dados de entrada e saída não são consistentes.");
    return;
  }

  const model = await loadModel();
  await trainModel(model, inputData, outputData);

  // // Salvar o modelo após o treinamento
  // await saveModel(model);

  console.log("Modelo do Kiddo Step Treinado com sucesso!");
};

// Apenas Salva em Ambiente Node Muito Avançado...
// //Função para salvar o modelo
// const saveModel = async (model) => {
//   try {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'model/', { intermediates: true });
//     await model.save(`${FileSystem.documentDirectory}model/model.json`);
//     console.log("Modelo salvo com sucesso");
//   } catch (error) {
//     console.error("Erro ao salvar o modelo:", error);
//   }
// };


// // Função para carregar o modelo salvo
// const loadSavedModel = async () => {
//   try {
//     const model = await tf.loadLayersModel(modelPath);
//     console.log("Modelo carregado com sucesso");
//     return model;
//   } catch (error) {
//     console.error("Erro ao carregar o modelo salvo:", error);
//     return null;
//   }
// };

// Função para fazer a predição
const predictLocation = async (model, recentLocations) => {
  const inputTensor = tf.tensor3d([recentLocations], [1, 3, 2]);
  const prediction = model.predict(inputTensor);
  const predictedLocation = prediction.arraySync()[0];
  console.log("Cai na predição agora ", predictedLocation);

  return {
    latitude: predictedLocation[0],
    longitude: predictedLocation[1],
  };
};

export { runTraining, predictLocation };

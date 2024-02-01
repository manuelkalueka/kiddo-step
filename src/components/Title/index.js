import { View, Text } from "react-native";

import styles from "./styles";
export default function Title() {
  return (
    <View>
      <Text style={styles.mainTitle}>Seja Bem-Vindo!</Text>
      <Text style={styles.description}>Entra na sua conta</Text>
    </View>
  );
}

import { View, Text } from "react-native";

import styles from "./styles";
export default function Title(props) {
  return (
    <View>
      <Text style={styles.mainTitle}>{props.title}</Text>
      <Text style={styles.description}>{props.subtitle}</Text>
    </View>
  );
}

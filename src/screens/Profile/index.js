import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "./style";

export default function Profile({navigation}) {
  return (
    <View>
      <Text onPress={() => navigation.navigate("KiddoDetailsScreen")}>
        Clica-me para navegar no perfil da Criança
      </Text>
    </View>
  );
}
export { Profile };

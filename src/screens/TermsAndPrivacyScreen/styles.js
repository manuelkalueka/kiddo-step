import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle"; // Importe o estilo padrão da sua aplicação

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: defaultStyle.colors.light,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: defaultStyle.colors.mainColorBlue,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default styles;

import { StyleSheet } from "react-native";
import defaultStyle from "./../../defaultStyle";

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: defaultStyle.sizes.bigTitle,
    fontWeight: "bold",
    color: defaultStyle.colors.black,
    marginVertical: 5,
  },
  description: {
    color: defaultStyle.colors.grayAccent2,
    fontSize: defaultStyle.sizes.title,
    marginBottom: 50,
    fontWeight: "400",
  },
});

export default styles;

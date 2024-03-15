import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";
const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  MainButton: {
    width: "100%",
    padding: 16,
    backgroundColor: defaultStyle.colors.mainColorBlue,
    borderRadius: defaultStyle.borderRadio.borderRadioButton.small,
  },
  textButton: {
    textAlign: "center",
    fontSize: defaultStyle.sizes.subtitle,
    color: defaultStyle.colors.white,
    fontWeight: "bold",
  },
});

export default styles;

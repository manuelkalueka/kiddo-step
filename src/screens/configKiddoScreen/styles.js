import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  keyZone: {
    width: "100%",
    height: "100%",
    paddingBottom: 40,
  },
  warnTitle: {
    fontSize: defaultStyle.sizes.title,
    color: defaultStyle.colors.blueDarkColor4,
    fontWeight: "bold",
    marginBottom: 15,
  },
  textCall: {
    fontSize: defaultStyle.sizes.label,
    color: defaultStyle.colors.grayAccent4,
  },
  top: {
    paddingBottom: 25,
  },

  label: {
    color: defaultStyle.colors.grayAccent2,
    fontSize: 16,
    marginTop: 15,
  },
  mainLabel: {
    paddingTop: "5%",
    paddingBottom: 5,
    fontWeight: "bold",
    fontSize: 15,
    color: defaultStyle.colors.grayAccent4,
  },
  textInput: {
    padding: 10,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
    fontSize: defaultStyle.sizes.inputText,
    marginTop: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: defaultStyle.colors.blueLightColor1,
  },
  msgAlerta: {
    color: defaultStyle.colors.danger,
    fontSize: defaultStyle.sizes.bodyText,
    alignSelf: "flex-start",
  },
});

export default styles;

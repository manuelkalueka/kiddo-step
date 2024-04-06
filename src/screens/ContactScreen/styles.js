import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:"5%",
    paddingVertical:"5%"
  },
  label: {
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
});

export default styles;

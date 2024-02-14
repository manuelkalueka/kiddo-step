import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyle.colors.white,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  containerTitle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: defaultStyle.sizes.bigTitle,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  subtitle: {
    textAlign: "center",
    width: 300,
    color: defaultStyle.colors.grayAccent2,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "auto",
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
  },

  input: {
    paddingVertical: 16,
    fontSize: 16,
    flex: 1,
  },

  inputFocused: {
    borderColor: defaultStyle.colors.mainColorBlue,
  },

  inputDefault: {
    borderColor: defaultStyle.colors.grayAccent1,
  },

  inputIcon: {
    marginRight: 10,
  },
  MainButton: {
    width: "100",
    marginTop: 15,
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

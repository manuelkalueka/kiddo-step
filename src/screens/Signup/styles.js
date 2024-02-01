import { StyleSheet } from "react-native";
import defaultStyles from "../../defaultStyle";

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: defaultStyles.colors.white,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },

  titleContainer: {
    marginTop: "10%",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "auto",
    borderRadius: defaultStyles.borderRadio.borderRadioInput,
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
    borderColor: defaultStyles.colors.mainColorBlue,
  },

  inputDefault: {
    borderColor: defaultStyles.colors.grayAccent1,
  },

  inputIcon: {
    marginRight: 10,
  },
  MainButton: {
    width: "100%",
    marginTop: 15,
    padding: 16,
    backgroundColor: defaultStyles.colors.mainColorBlue,
    borderRadius: defaultStyles.borderRadio.borderRadioButton.small,
  },
  textButton: {
    textAlign: "center",
    fontSize: defaultStyles.sizes.subtitle,
    color: defaultStyles.colors.white,
    fontWeight: "bold",
  },
  haveAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 36,
  },
  haveAccountText: {
    fontWeight: "400",
    fontSize: defaultStyles.sizes.subtitle,
  },
  buttonAction: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  haveAccounAction: {
    color: defaultStyles.colors.mainColorBlue,
    fontWeight: "bold",
    fontSize: defaultStyles.sizes.subtitle,
  },
});

export default styles;

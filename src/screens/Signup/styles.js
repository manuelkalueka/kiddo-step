import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: defaultStyle.colors.white,
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
    width: "100%",
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
  haveAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 36,
  },
  haveAccountText: {
    fontWeight: "400",
    fontSize: defaultStyle.sizes.subtitle,
  },
  buttonAction: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  haveAccounAction: {
    color: defaultStyle.colors.mainColorBlue,
    fontWeight: "bold",
    fontSize: defaultStyle.sizes.subtitle,
  },
  msgAlerta: {
    color: defaultStyle.colors.danger,
    fontSize: defaultStyle.sizes.bodyText,
    alignSelf: "flex-start",
    marginLeft: "2.5%",
  },
});

export default styles;

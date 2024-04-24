import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: defaultStyle.colors.white,
    paddingHorizontal: "5%",
  },

  titleContainer: {
    marginTop: "10%",
  },
  sectionTitle: {
    color: defaultStyle.colors.grayAccent4,
    fontWeight: "bold",
    fontSize: defaultStyle.sizes.titleSmall,
    marginVertical: 10,
  },

  label: {
    color: defaultStyle.colors.grayAccent2,
    fontSize: 16,
    marginTop: 15,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "auto",
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
    borderWidth: 1,
    borderColor: defaultStyle.colors.blueLightColor1,
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
  msgAlerta: {
    color: defaultStyle.colors.danger,
    fontSize: defaultStyle.sizes.bodyText,
    alignSelf: "flex-start",
    marginLeft: "2.5%",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  changePicLabel: {
    width: "100%",
    fontWeight: "bold",
    color: defaultStyle.colors.blueLightColor3,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default styles;

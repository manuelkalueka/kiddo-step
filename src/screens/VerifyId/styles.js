import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyle.colors.white,
  },

  containerTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: defaultStyle.sizes.bigTitle,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  subtitle: {
    color: defaultStyle.colors.grayAccent2,
  },
  pressContainer: {
    width: "100%",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },

  iconContainer: {
    backgroundColor: defaultStyle.colors.light,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  pressItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "auto",
    borderWidth: 1,
    borderColor: defaultStyle.colors.grayAccent1,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
    paddingVertical: "3%",
    paddingHorizontal: "3%",
    marginVertical: "2%",
  },
  methodTitle: {
    fontWeight: "bold",
    color: defaultStyle.colors.dark,
    marginBottom: 5,
  },
  descMethod: {
    color: defaultStyle.colors.grayAccent2,
  },
  texts: {
    marginLeft: 10,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: "5%",
    paddingTop: "20%",
  },

  button: {
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
});

export default styles;

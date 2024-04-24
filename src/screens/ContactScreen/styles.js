import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "5%",
  },
  containerModal: {
    flex: 1,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  top: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonAdContact: {
    width: "30%",
    padding: 10,
    marginBottom: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    color: defaultStyle.colors.blueDarkColor3,
    backgroundColor: defaultStyle.colors.mainColorBlue,
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
  msgAlerta: {
    color: defaultStyle.colors.danger,
    fontSize: defaultStyle.sizes.bodyText,
    alignSelf: "flex-start",
    marginLeft: "2.5%",
  },
  contactContainer: {
    width: "100%",
    marginVertical: "1%",
    paddingHorizontal: "5%",
    backgroundColor: defaultStyle.colors.white,
  },
  labelName: {
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: "bold",
    fontSize: 15,
    color: defaultStyle.colors.grayAccent4,
  },
  labelAddress: {
    fontSize: 14,
    color: defaultStyle.colors.grayAccent4,
    marginBottom: 5,
  },
  labelPhone: {
    fontSize: 14,
    color: defaultStyle.colors.grayAccent2,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: "3%",
    width: 80,
    marginTop: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: defaultStyle.colors.blueDarkColor1,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;

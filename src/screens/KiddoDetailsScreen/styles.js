import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.mainColorBlue,
  },
  picContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyle.colors.mainColorBlue,
    height: "35%",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: defaultStyle.colors.blueDarkColor3,
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: defaultStyle.borderRadio.cards[0],
  },
  kiddoImg: {
    width: 80,
    height: 80,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    right: "2%",
    width: "80%",
  },
  headerSurname: {
    fontSize: defaultStyle.sizes.bigTitle,
    color: defaultStyle.colors.light,
    fontWeight: "bold",
  },
  headerAge: {
    marginTop: 5,
    fontSize: defaultStyle.sizes.subtitle,
    color: defaultStyle.colors.grayAccent2,
    fontWeight: "bold",
  },
  buttonMapContainer: {
    borderRadius: defaultStyle.borderRadio.cards[0],
    backgroundColor: defaultStyle.colors.blueDarkColor1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonChangeImg: {
    position: "absolute",
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    borderRadius: defaultStyle.borderRadio.cards[0],
    backgroundColor: defaultStyle.colors.blueDarkColor1,
    padding: 5,
  },
  iconChangeImg: {
    color: defaultStyle.colors.white,
    fontWeight: "bold",
  },
  actionButtons: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "2%",
  },
  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: defaultStyle.borderRadio.cards[0],
    backgroundColor: defaultStyle.colors.accentColor3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textAction: {
    color: defaultStyle.colors.white,
    fontWeight: "bold",
    marginLeft: 5,
  },
  bodyContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: defaultStyle.colors.light,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
    borderWidth: 1,
    borderColor: defaultStyle.colors.grayAccent1,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: defaultStyle.colors.white,
  },

  input: {
    marginLeft: 10,
    paddingVertical: 16,
    fontSize: 16,
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
  },
});

export default styles;

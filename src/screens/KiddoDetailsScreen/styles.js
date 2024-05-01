import { Platform, StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.mainColorBlue,
  },
  containerButton: {
    paddingVertical: "4%",
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  buttonIcon: {
    fontSize: 16,
    color: defaultStyle.colors.white,
    fontWeight: "bold",
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
  avatar: {
    width: 80,
    height: 80,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    right: Platform.OS === "ios" ? "2%" : "0%",
    width: "80%",
  },
  headerSurname: {
    fontSize:
      Platform.OS === "ios"
        ? defaultStyle.sizes.bigTitle
        : defaultStyle.sizes.title,
    color: defaultStyle.colors.light,
    fontWeight: "bold",
  },
  headerAge: {
    marginTop: 5,
    fontSize: defaultStyle.sizes.subtitle,
    color: defaultStyle.colors.grayAccent3,
    fontWeight: "bold",
  },
  buttonStatusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBatteryContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStatusIcon: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  textStatus: {
    color: defaultStyle.colors.white,
    marginLeft: 10,
    textAlign: "center",
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
    width: "85%",
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
  bodyDetails: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: defaultStyle.colors.light,
    padding: 20,
  },
  labels: {
    fontSize: defaultStyle.sizes.inputLabels,
    color: defaultStyle.colors.dark,
    marginVertical: 10,
    fontWeight: "300",
  },

  input: {
    paddingVertical: Platform.OS === "ios" ? 16 : 8,
    paddingHorizontal: 5,
    fontSize: 16,
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
    borderWidth: 1,
    borderColor: defaultStyle.colors.blueLightColor1,
  },
  picker: {
    // height: Platform.OS === "ios" ? 50 : null,
    backgroundColor: defaultStyle.colors.white,
    borderRadius: defaultStyle.borderRadio.borderRadioInput,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: defaultStyle.sizes.title,
    color: defaultStyle.colors.dark,
    marginTop: 30,
    marginBottom: 10,
  },
  MainButton: {
    width: "100%",
    marginVertical: 15,
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
  mainButtonContainer: {
    marginTop: 20,
    marginBottom: Platform.OS === "ios" ? "8%" : "10%",
  },
});

export default styles;

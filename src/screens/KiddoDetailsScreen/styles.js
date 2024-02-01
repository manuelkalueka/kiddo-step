import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
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
});

export default styles;

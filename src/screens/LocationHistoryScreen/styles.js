import { Platform, StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.light,
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: defaultStyle.colors.light,
    justifyContent: "center",
    alignItems: "center",
  },
  textEmpty: {
    fontSize: defaultStyle.sizes.titleSmall,
    justifyContent: "center",
    alignItems: "center",
    color: defaultStyle.colors.grayAccent4,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: defaultStyle.colors.white,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderBottomWidth: 1,
    borderBottomColor: defaultStyle.colors.grayAccent1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  item: {
    maxWidth: "80%",
  },
  header: {
    color: defaultStyle.colors.dark,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? defaultStyle.sizes.inputLabels : 14,
    marginBottom: 10,
  },
  date: {
    color: defaultStyle.colors.grayAccent4,
  },
  itemAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  textAction: {
    marginRight: 5,
    fontSize: defaultStyle.sizes.inputText,
    color: defaultStyle.colors.mainColorBlue,
  },
  containerSheet: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailContainer: {
    borderBottomWidth: 0.6,
    borderBottomColor: defaultStyle.colors.grayAccent1,
    paddingBottom: 10,
  },
  mainDetailHeader: {
    color: defaultStyle.colors.dark,
    fontWeight: "bold",
    fontSize: defaultStyle.sizes.titleSmall,
    paddingVertical: 10,
  },
  detailHeader: {
    fontWeight: "bold",
    fontSize: defaultStyle.sizes.label,
    color: defaultStyle.colors.dark,
    marginTop: 20,
    marginBottom: 10,
  },
  detailContent: {
    color: defaultStyle.colors.grayAccent2,
    marginBottom: 10,
  },
  labelContent: { fontWeight: "bold" },
  mapStatic: {
    height: "95%",
    width: "100%",
    alignSelf: "baseline",
  },
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 100,
    padding: 10,
    height: "auto",
  },
  buttonClose: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  textStyle: {
    textAlign: "center",
    color: defaultStyle.colors.mainColorBlue,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default styles;

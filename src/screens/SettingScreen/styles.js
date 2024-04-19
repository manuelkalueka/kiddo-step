import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.light,
  },
  containerLabel: {
    backgroundColor: defaultStyle.colors.light,
    width: "100%",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
  },
  label: {
    color: defaultStyle.colors.grayAccent3,
    fontSize: defaultStyle.sizes.mainLabels,
  },
  menu: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: defaultStyle.colors.white,
    paddingHorizontal: "5%",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "5%",
  },
  itemDesc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemIco: {
    width: 50,
    height: 50,
    marginRight: "4%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyle.colors.light,
    borderRadius: "100%",
  },
  descText: {
    fontSize: defaultStyle.sizes.mainLabels,
  },
  optionText: {
    alignSelf: "flex-end",
    color:defaultStyle.colors.grayAccent2
  },
  footer: {
    flex: 1,
    paddingTop: "20%",

    paddingBottom: "15%",
    backgroundColor: defaultStyle.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  descFooter: {
    fontSize: defaultStyle.sizes.bodyText,
    color: defaultStyle.colors.grayAccent2,
  },
});

export default styles;

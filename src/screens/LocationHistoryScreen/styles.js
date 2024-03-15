import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.light,
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
  header: {
    color: defaultStyle.colors.dark,
    fontWeight: "bold",
    fontSize: defaultStyle.sizes.titleSmall,
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
});

export default styles;

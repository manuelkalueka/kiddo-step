import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "3%",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    borderBottomColor: defaultStyle.colors.grayAccent1,
    borderBottomWidth: 0.5,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: "100%",
    marginRight: "3%",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  displayName: {
    marginBottom: "5%",
    fontSize: defaultStyle.sizes.mainLabels,
    fontWeight: "bold",
  },
  displayPhoneNumber: {
    color: defaultStyle.colors.grayAccent2,
    fontSize: defaultStyle.sizes.label,
  },
  menu: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    marginBottom: "5%",
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
});

export default styles;

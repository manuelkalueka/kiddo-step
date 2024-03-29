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
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: defaultStyle.colors.grayAccent1,
    borderBottomWidth: 0.5,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  displayName: {
    marginBottom: 5,
    fontSize: defaultStyle.sizes.mainLabels,
    fontWeight: "bold",
  },
  displayPhoneNumber: {
    color: defaultStyle.colors.grayAccent2,
    fontSize: defaultStyle.sizes.label,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomColor: defaultStyle.colors.grayAccent1,
    borderBottomWidth: 0.5,
  },
  itemDesc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyle.colors.light,
    borderRadius: 25,
  },
  descText: {
    fontSize: defaultStyle.sizes.mainLabels,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: defaultStyle.colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default styles;

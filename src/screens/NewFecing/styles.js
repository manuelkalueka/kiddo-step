import { StyleSheet, Platform } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.light,
    paddingBottom: 20,
  },
  mapContainer: {
    width: "100%",
    height: "40%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  interfaceContainer: {
    flex: 1,
    paddingHorizontal: "5%",
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

  targetAvatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  labelTarget: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 15,
    color: defaultStyle.colors.grayAccent4,
  },

  targetSide: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 50,
    height: 50,
  },

  msgAlerta: {
    color: defaultStyle.colors.danger,
    fontSize: defaultStyle.sizes.bodyText,
    alignSelf: "flex-start",
  },
});

export default styles;

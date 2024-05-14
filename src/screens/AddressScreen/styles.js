import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyle.colors.white,
    padding: "5%",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  topContainer: {
    flexDirection: "row",
    borderColor: defaultStyle.colors.grayAccent1,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  adressLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    fontSize: 16,
  },
  newAddress: {
    marginTop: 20,
    alignSelf: "flex-end",
    backgroundColor: defaultStyle.colors.mainColorBlue,
    padding: 10,
    borderRadius: 5,
  },
  txtButton: {
    color: defaultStyle.colors.white,
    fontWeight: "bold",
  },
});

export default styles;

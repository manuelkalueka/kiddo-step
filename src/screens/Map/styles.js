import { StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const styles = StyleSheet.create({
  mapContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: defaultStyle.colors.light,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonMapConfigContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    zIndex: 1, // Para garantir que os botões estejam acima do mapa
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mapButton: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 25,
    padding: 10,
    marginVertical: 5,
  },
});

export default styles;

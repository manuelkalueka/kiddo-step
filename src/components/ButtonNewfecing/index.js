import React from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import defaultStyle from "../../defaultStyle";

const ButtonNewfecing = (props) => {
  return (
    <View style={styles.container}>
      <Entypo
        name="plus"
        size={props.size}
        color={
          props.focused
            ? defaultStyle.colors.blueLightColor1
            : defaultStyle.colors.light
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: defaultStyle.colors.mainColorBue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});

export default ButtonNewfecing;

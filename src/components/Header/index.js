import React from "react";
import { View, Text, StyleSheet } from "react-native";
import defaultStyle from "../../defaultStyle";

const Header = (props) => {
  return (
    <View>
      <Text style={styles.title}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: defaultStyle.colors.white,
    fontSize: 22,
    fontWeight: "bold",
  },
});
export default Header;

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import styles from "./styles";

const ActionButtom = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.MainButton} {...props}>
        <Text style={styles.textButton}>{props.textButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtom;

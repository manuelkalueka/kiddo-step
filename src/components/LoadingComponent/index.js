import React from "react";
import { View, ActivityIndicator } from "react-native";

import styles from "./styles";
import defaultStyle from "../../defaultStyle";

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={defaultStyle.colors.mainColorBlue} />
    </View>
  );
};

export default LoadingComponent;

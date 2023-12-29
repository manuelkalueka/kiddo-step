import { Fragment } from "react";
import {Text } from "react-native";
import styles from "./styles";

export default function Title(props) {
  return (
    <Fragment>
      <Text style={styles.mainTitle}>{props.title}</Text>
      <Text style={styles.description}>{props.subtitle}</Text>
    </Fragment>
  );
}

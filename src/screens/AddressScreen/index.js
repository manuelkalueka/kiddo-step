import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import { useAuth } from "../../contexts/auth";

const AddressScreen = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Endereços Seguros</Text>
      <View style={styles.topContainer}>
        <Text style={styles.adressLabel}>Endereço de Casa: </Text>
        <Text style={styles.address}>{user?.address}</Text>
      </View>
      <TouchableOpacity
        style={styles.newAddress}
        onPress={() => Alert.alert("Funcionalidade Futura")}
      >
        <Text style={styles.txtButton}>Adicionar Novos Endereços</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;

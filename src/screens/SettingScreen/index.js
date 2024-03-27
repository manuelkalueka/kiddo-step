import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/auth";
import { AntDesign } from "@expo/vector-icons";

import defaultStyle from "../../defaultStyle";
import ActionButtom from "../../components/ActionButtom";

import styles from "./styles";

const SettingScreen = () => {
  function handleSignOut() {
    //ToDo pedir confirmação ao Sair
    signOut();
  }

  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.menu}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Geral</Text>
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate("Profile", { screen: "Account" })
            }
          >
            <View style={styles.itemDesc}>
              <Text style={styles.descText}>Idioma</Text>
            </View>
            <Text>Português</Text>
            <AntDesign
              name="right"
              color={defaultStyle.colors.grayAccent1}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate("Profile", { screen: "Account" })
            }
          >
            <View style={styles.itemDesc}>
              <Text style={styles.descText}>Contacte-nos</Text>
            </View>
            <AntDesign
              name="right"
              color={defaultStyle.colors.grayAccent1}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Segurança</Text>
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate("Profile", { screen: "Account" })
            }
          >
            <View style={styles.itemDesc}>
              <Text style={styles.descText}>Biométrica</Text>
              <Text>Activa Impressão Digital & FaceID</Text>
            </View>
            <AntDesign
              name="right"
              color={defaultStyle.colors.grayAccent1}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate("Profile", { screen: "Account" })
            }
          >
            <View style={styles.itemDesc}>
              <Text style={styles.descText}>Políticas de Privacidade</Text>
            </View>
            <AntDesign
              name="right"
              color={defaultStyle.colors.grayAccent1}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          <ActionButtom textButton="Terminar Sessão" onPress={handleSignOut} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.descFooter}>Kiddo Step, 2024 © v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

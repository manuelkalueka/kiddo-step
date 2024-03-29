import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth";
import styles from "./style";
import defaultStyle from "../../defaultStyle";
import ActionButtom from "../../components/ActionButtom";

export default function Profile({ navigation }) {
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("./../../../assets/img/avatar-parent-man.png")}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.displayName}>João António</Text>
          <Text style={styles.displayPhoneNumber}>923 405 066</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableHighlight
          style={styles.menuItem}
          onPress={() => navigation.navigate("Profile", { screen: "Account" })}
        >
          <View style={styles.itemDesc}>
            <View style={styles.itemIcon}>
              <FontAwesome5
                name="user-alt"
                color={defaultStyle.colors.mainColorBlue}
                size={20}
              />
            </View>
            <Text style={styles.descText}>Minha Conta</Text>
          </View>
          <AntDesign
            name="right"
            color={defaultStyle.colors.grayAccent1}
            size={20}
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.menuItem}>
          <View style={styles.itemDesc}>
            <View style={styles.itemIcon}>
              <Ionicons
                name="location-sharp"
                color={defaultStyle.colors.mainColorBlue}
                size={20}
              />
            </View>
            <Text style={styles.descText}>Endereço</Text>
          </View>
          <AntDesign
            name="right"
            color={defaultStyle.colors.grayAccent1}
            size={20}
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.menuItem}>
          <View style={styles.itemDesc}>
            <View style={styles.itemIcon}>
              <FontAwesome
                name="phone"
                color={defaultStyle.colors.mainColorBlue}
                size={20}
              />
            </View>
            <Text style={styles.descText}>Contactos</Text>
          </View>
          <AntDesign
            name="right"
            color={defaultStyle.colors.grayAccent1}
            size={20}
          />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menuItem}
          onPress={() => navigation.navigate("Setting")}
        >
          <View style={styles.itemDesc}>
            <View style={styles.itemIcon}>
              <FontAwesome
                name="gear"
                color={defaultStyle.colors.mainColorBlue}
                size={20}
              />
            </View>
            <Text style={styles.descText}>Configurações</Text>
          </View>
          <AntDesign
            name="right"
            color={defaultStyle.colors.grayAccent1}
            size={20}
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.menuItem}>
          <View style={styles.itemDesc}>
            <View style={styles.itemIcon}>
              <Entypo
                name="help-with-circle"
                color={defaultStyle.colors.mainColorBlue}
                size={20}
              />
            </View>
            <Text style={styles.descText}>Ajuda</Text>
          </View>
          <AntDesign
            name="right"
            color={defaultStyle.colors.grayAccent1}
            size={20}
          />
        </TouchableHighlight>
        <ActionButtom textButton="Terminar Sessão" onPress={handleSignOut} />
      </ScrollView>
    </View>
  );
}

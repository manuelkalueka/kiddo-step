import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
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
  const { signOut, user } = useAuth();

  function handleSignOut() {
    signOut();
  }
  const parentAvatar = require("./../../../assets/img/avatar-parent-man.png");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={parentAvatar} style={styles.avatar} />
        </View>
        <View>
          <Text style={styles.displayName}>{user?.fullName}</Text>
          <Text style={styles.displayPhoneNumber}>{user?.phone}</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Account")}
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
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.itemDesc}>
            <View style={styles.itemIcon}>
              <Ionicons
                name="location-sharp"
                color={defaultStyle.colors.mainColorBlue}
                size={20}
              />
            </View>
            <Text style={styles.descText}>Endereços</Text>
          </View>
          <AntDesign
            name="right"
            color={defaultStyle.colors.grayAccent1}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate("Contact");
          }}
        >
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
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
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
        </TouchableOpacity>
        <ActionButtom textButton="Terminar Sessão" onPress={handleSignOut} />
      </ScrollView>
    </View>
  );
}

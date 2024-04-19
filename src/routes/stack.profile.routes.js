import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import Profile from "./../screens/Profile";
import SettingScreen from "../screens/SettingScreen";
import AccountScreen from "./../screens/AccountScreen";
import ContactScreen from "../screens/ContactScreen";
import TermsAndPrivacyScreen from "../screens/TermsAndPrivacyScreen";

const SettingStack = () => {
  return(
  <Navigator screenOptions={{
    headerShown:false
  }}>
    <Screen name="Setting" component={SettingScreen} />
    <Screen name="TermsAndPrivacy" component={TermsAndPrivacyScreen} />
  </Navigator>)
};

const ProfileStack = () => {
  return (
    <Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Profile" component={Profile} />
      <Screen name="Account" component={AccountScreen} />
      <Screen name="Contact" component={ContactScreen} />
      <Screen name="Setting" component={SettingStack} />
    </Navigator>
  );
};

export default ProfileStack;

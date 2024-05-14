import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import Profile from "./../screens/Profile";
import SettingScreen from "../screens/SettingScreen";
import AccountScreen from "./../screens/AccountScreen";
import ContactScreen from "../screens/ContactScreen";
import TermsAndPrivacyScreen from "../screens/TermsAndPrivacyScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import AddressScreen from "../screens/AddressScreen";

const SettingStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SetNested" component={SettingScreen} />
      <Screen name="TermsAndPrivacy" component={TermsAndPrivacyScreen} />
      <Screen name="ContactUs" component={ContactUsScreen} />
    </Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="ProfNested" component={Profile} />
      <Screen name="Account" component={AccountScreen} />
      <Screen name="Address" component={AddressScreen} />
      <Screen name="Contact" component={ContactScreen} />
      <Screen name="Setting" component={SettingStack} />
    </Navigator>
  );
};

export default ProfileStack;

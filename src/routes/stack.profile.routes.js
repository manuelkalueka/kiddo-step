import React, { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import Profile from "./../screens/Profile";
import SettingScreen from "../screens/SettingScreen";
import AccountScreen from "./../screens/AccountScreen";

const ProfileStack = () => {
  return (
    <Fragment>
      <Navigator initialRouteName="Profile">
        <Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Screen name="Account" component={AccountScreen} />
        <Screen name="Setting" component={SettingScreen} />
      </Navigator>
    </Fragment>
  );
};

export default ProfileStack;

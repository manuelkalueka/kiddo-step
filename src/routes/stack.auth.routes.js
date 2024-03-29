import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import Signup from "../screens/Signup";
import VerifyId from "../screens/VerifyId";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";

const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="VerifyId"
        component={VerifyId}
        options={{
          title: "Verificar Conta",
        }}
      />
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: "Recuperar senha",
        }}
      />

      <Screen
        name="CreatePassword"
        component={CreatePasswordScreen}
        options={{
          title: "Criar Senha",
        }}
      />
    </Navigator>
  );
};

export default AuthRoutes;

import { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import defaultStyle from "../defaultStyle";
const { Screen, Navigator } = createNativeStackNavigator();

import Signup from "../screens/Signup";
import VerifyId from "../screens/VerifyId";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";

const SignupNavigation = () => {
  return (
    <Fragment>
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
            headerStyle: {
              headerBackgroundColor: defaultStyle.colors.mainColorBlue,
            },
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
            headerStyle: {
              headerBackgroundColor: defaultStyle.colors.mainColorBlue,
            },
          }}
        />

        <Screen
          name="CreatePassword"
          component={CreatePasswordScreen}
          options={{
            title: "Criar Senha",
            headerStyle: {
              headerBackgroundColor: defaultStyle.colors.mainColorBlue,
            },
          }}
        />
      </Navigator>
    </Fragment>
  );
};

export default SignupNavigation;

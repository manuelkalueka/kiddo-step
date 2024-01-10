import { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import defaultStyle from "../defaultStyle";
const { Screen, Navigator } = createNativeStackNavigator();

import Signup from "../screens/Signup";
import VerifyId from "../screens/VerifyId";
import Login from "../screens/Login"

const SignupNavigation = () => {
  return (
    <Fragment>
        <Navigator>
          <Screen name="Signup" component={Signup} options={
            {
              headerShown:false
            }
          }/>
          <Screen name="VerifyId" component={VerifyId} options={
            {
              title:"Verificar Conta",
              headerStyle:{
                headerBackgroundColor:defaultStyle.colors.mainColorBue
              }
            }
          } />
          <Screen name="Login" component={Login} />
        </Navigator>
    </Fragment>
  );
};

export default SignupNavigation;

import { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

//Telas
import AlertScreen from "../screens/AlertScreen";
import LocationHistoryScreen from "../screens/LocationHistoryScreen";
import ProfileStack from "./stack.profile.routes";
import NewFecing from "../screens/NewFecing";
import Map from "../screens/Map";
//-----------------------------------------------------

const AppStack = () => {
  return (
    <Fragment>
      <Navigator initialRouteName="Mapa">
        <Screen name="Mapa" component={Map} />
        <Screen name="locationHistory" component={LocationHistoryScreen} />
        <Screen name="Cerca" component={NewFecing} />
        <Screen name="Alertas" component={AlertScreen} />
        <Screen name="Perfil" component={ProfileStack} />
      </Navigator>
    </Fragment>
  );
};

export default AppStack;

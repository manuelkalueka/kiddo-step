import { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Map from "../screens/Map";
import KiddoDetailsScreen from "../screens/KiddoDetailsScreen";
const { Screen, Navigator } = createNativeStackNavigator();

const MapNavigation = () => {
  <Fragment>
    <Navigator>
      <Screen name="Mapa" component={Map} />
      <Screen name="KiddoDetails" component={KiddoDetailsScreen} />
    </Navigator>
  </Fragment>;
};

export default MapNavigation;

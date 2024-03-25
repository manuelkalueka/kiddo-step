import React, { useContext } from "react";
import LoadingComponent from "../../src/components/LoadingComponent";

import {useAuth} from "../contexts/auth";
// ----------- Stacks ---------------------
import AppStack from "./stack.app.routes";
import AuthRoutes from "./stack.auth.routes";
//-----------------------------------------------

export function Router() {
  const { signed, loading } = useAuth();

  if (loading) {
    // COLOCAR O EXPO SPLASH SCREEN
    return <LoadingComponent />;
  }

  return signed ? <AppStack /> : <AuthRoutes />;
}
